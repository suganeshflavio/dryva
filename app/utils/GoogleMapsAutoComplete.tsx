import { LocationType } from "@/app/Types/Location";
import { Input } from "antd";
import { useRef, useEffect, useState } from "react";
import type { InputRef } from "antd";

type GooglePlacesComboBoxProps = {
  placeholder?: string;
  onSelect: (place: google.maps.places.PlaceResult) => void;
  location: LocationType | null;
  disabled?: boolean;
  onChange?: (value: string) => void;
  value?: string;
};

function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

export default function GooglePlacesComboBox({
  placeholder = "Search location...",
  onSelect,
  location,
  value,
  onChange,
  disabled,
}: Readonly<GooglePlacesComboBoxProps>) {
  const inputRef = useRef<InputRef | null>(null);
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [HoldTrigger, setHoldTrigger] = useState(false);
  const serviceRef = useRef<google.maps.places.AutocompleteService | null>(
    null,
  );
const [inputValue, setInputValue] = useState("");

  // Initialize service on browser only
  useEffect(() => {
    if (typeof window === "undefined" || !window.google) return;

    serviceRef.current = new window.google.maps.places.AutocompleteService();
  }, []);

  // Debounced fetch predictions
  const fetchPredictions = debounce((...args: unknown[]) => {
    const input = args[0] as string;
    if (!input || !serviceRef.current) return;

    serviceRef.current.getPlacePredictions(
      { input, types: ["geocode"] },
      (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          setPredictions(results);
        } else {
          setPredictions([]);
        }
      },
    );
  }, 800);

  // Handle user typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    fetchPredictions(value);
  };

  // Handle geocoding based on external location
  useEffect(() => {
    if (
      !location?.latitude ||
      !location?.longitude ||
      typeof window === "undefined" ||
      HoldTrigger
    )
      return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: location.latitude, lng: location.longitude } },
      (results, status) => {
        if (status === "OK" && results && results[0] && inputRef.current) {
          inputRef.current.input!.value = results[0].formatted_address;
          setInputValue(results[0].formatted_address);
        }
      },
    );
  }, [location?.latitude, location?.longitude]);

  // Handle selecting a prediction
  const handleSelectPrediction = (placeId: string) => {
    if (!window.google) return;
    setHoldTrigger(true);
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div"),
    );
    service.getDetails({ placeId }, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        place
      ) {
        onSelect(place);
        setPredictions([]);
        if (inputRef.current)
          inputRef.current.input!.value = place.formatted_address || "";
        setInputValue(place.formatted_address || "");
      }
    });
    setTimeout(() => {
      setHoldTrigger(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={value ?? inputValue}
        type="text"
        disabled={disabled}
        // className="h-12 w-116 px-3 pr-0 text-lg font-medium border border-gray-300 dark:border-gray-600 rounded-xl bg-white/90 dark:bg-dark-900/90 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md shadow-xl transition-all duration-200 ease-in-out disabled:bg-gray-100 disabled:dark:bg-dark-800 disabled:text-gray-500 disabled:cursor-not-allowed"
        className="ant-input ant-input-lg w-96 h-8 rounded-sm pr-10 border border-gray-300 dark:border-gray-600 text-base font-medium bg-white/90 dark:bg-dark-900/90 text-gray-900 dark:text-white placeholdertext placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400 backdrop-blur-md transition-all duration-200 ease-in-out disabled:bg-gray-100 disabled:dark:bg-dark-800 disabled:text-gray-500 disabled:cursor-not-allowed"
        placeholder={placeholder}
        // onChange={handleChange}
        onChange={(e) => {
          onChange?.(e.target.value);
          setInputValue(e.target.value);
          fetchPredictions(e.target.value);
        }}
      />

      {predictions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white dark:bg-dark-900 border border-gray-300 dark:border-gray-700 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {predictions.map((p) => (
            <li
              key={p.place_id}
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-dark-800 cursor-pointer"
              onClick={() => handleSelectPrediction(p.place_id)}
            >
              {p.description}
            </li>
          ))}
        </ul>
      )}

      {location?.latitude && location?.longitude && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-dark-900 shadow" />
      )}
    </div>
  );
}
