// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Row,
//   Col,
//   Typography,
//   Input,
//   Button,
//   Space,
//   Form,
//   Select,
//   message,
// } from "antd";
// import Image from "next/image";
// import { ArrowLeftOutlined } from "@ant-design/icons";
// import { requestOtp, verifyOtp } from "@/app/api/Auth";
// import { useRouter } from "next/navigation";

// const { Title, Text } = Typography;

// export default function LoginPage() {
//   const [step, setStep] = useState<"mobile" | "otp">("mobile");
//   const [timer, setTimer] = useState(30);
//   const [canResend, setCanResend] = useState(false);
//   const [mobile, setMobile] = useState("");
//   const [countryCode, setCountryCode] = useState("+86");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   const prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//       <Select
//         style={{ width: 70 }}
//         defaultValue={"86"}
//         value={countryCode}
//         onChange={(value) => setCountryCode(value)}
//         options={[
//           { label: "+86", value: "86" },
//           { label: "+87", value: "87" },
//         ]}
//       />
//     </Form.Item>
//   );

//   const handleSendOtp = async () => {
//     if (!mobile) return;

//     try {
//       setLoading(true);

//       await requestOtp({
//         phone: mobile,
//         country_code: countryCode,
//         passenger: true,
//       });
//       message.success("OTP sent successfully");
//       setStep("otp");
//       setTimer(30);
//       setCanResend(false);
//     } catch (err: unknown) {
//       message.error(
//         err instanceof Error ? err.message : "Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* OTP Timer */
//   useEffect(() => {
//     if (step === "otp" && timer > 0) {
//       const interval = setInterval(() => setTimer((t) => t - 1), 1000);
//       return () => clearInterval(interval);
//     }
//     if (timer === 0) setCanResend(true);
//   }, [step, timer]);

//   // const handleSendOtp = () => {
//   //   setStep('otp');
//   //   setTimer(30);
//   //   setCanResend(false);
//   // };
//   const router = useRouter();
//   const handleVerifyOtp = async () => {
//     if (!otp) return;

//     try {
//       setLoading(true);

//       const response = await verifyOtp({
//         phone: mobile,
//         otp,
//       });
//       sessionStorage.setItem("token", response.access_token);
//       router.push("/");
//       console.log("Login success:", response);
//       // redirect / store token here
//     } catch (err: unknown) {
//       message.error(
//         err instanceof Error ? err.message : "Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleResendOtp = () => {
//   //   setTimer(30);
//   //   setCanResend(false);
//   // };

//   return (
//     <Row style={{ minHeight: "100vh" }}>
//       {/* LEFT IMAGE */}
//       <Col
//         xs={0}
//         md={12}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           // padding: 32, // ← UI breathing space
//           animation: "slideFromLeft 1s ease forwards",
//         }}
//       >
//         <div
//           style={{
//             position: "relative",
//             marginTop: "80px",
//             marginLeft: "90px",
//             width: "80%",
//             height: "80%",
//             //   maxHeight: '85vh',
//             borderRadius: 16,
//             overflow: "hidden",
//           }}
//         >
//           <Image
//             src="/images/hero.png"
//             alt="Dryva Login"
//             fill
//             priority
//             style={{ objectFit: "cover" }}
//           />
//         </div>
//       </Col>

//       {/* RIGHT CONTENT */}
//       <Col
//         xs={24}
//         md={12}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           animation: "slideFromRight 1s ease forwards",
//         }}
//       >
//         <div style={{ width: "100%", maxWidth: 380 }}>
//           {step === "otp" && (
//             <Button
//               type="text"
//               icon={<ArrowLeftOutlined />}
//               onClick={() => {
//                 setStep("mobile");
//                 setMobile("");
//                 setOtp("");
//               }}
//               style={{ marginBottom: "5px" }}
//             >
//               {" "}
//               Back{" "}
//             </Button>
//           )}
//           <Title level={2}>Welcome to Dryva</Title>
//           <Text type="secondary" style={{ fontSize: 16 }}>
//             Enter your mobile number to start your journey
//           </Text>

//           <Space
//             direction="vertical"
//             size="large"
//             style={{ width: "100%", marginTop: 24 }}
//           >
//             {/* MOBILE NUMBER */}
//             {step === "mobile" && (
//               <>
//                 <Space.Compact block>
//                   {prefixSelector}
//                   <Input
//                     size="large"
//                     placeholder="Enter Mobile Number"
//                     type="tel"
//                     value={mobile}
//                     onChange={(e) =>
//                       setMobile(e.target.value.replace(/\D/g, ""))
//                     }
//                   />
//                 </Space.Compact>

//                 <Button
//                   type="primary"
//                   size="large"
//                   block
//                   style={{ background: "#fe9900" }}
//                   onClick={handleSendOtp}
//                   // htmlType="submit"
//                   loading={loading}
//                 >
//                   Send OTP
//                 </Button>
//                 <Text style={{ display: "block" }}>
//                   Don't have an account? <a href="/signup">Signup</a>
//                 </Text>
//               </>
//             )}

//             {/* OTP */}
//             {step === "otp" && (
//               <>
//                 <Input.OTP
//                   length={5}
//                   size="large"
//                   value={otp}
//                   onChange={setOtp}
//                 />
//                 <Text type="secondary">
//                   {canResend ? (
//                     <Button type="link" onClick={handleSendOtp}>
//                       Resend OTP
//                     </Button>
//                   ) : (
//                     <>Resend OTP in {timer}s</>
//                   )}
//                 </Text>

//                 <Button
//                   type="primary"
//                   size="large"
//                   block
//                   style={{ background: "#fe9900" }}
//                   onClick={handleVerifyOtp}
//                   loading={loading}
//                 >
//                   Verify & Login
//                 </Button>
//               </>
//             )}
//           </Space>
//         </div>
//       </Col>

//       {/* KEYFRAMES */}
//       <style jsx global>{`
//         @keyframes slideFromLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-120px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes slideFromRight {
//           from {
//             opacity: 0;
//             transform: translateX(120px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//       `}</style>
//     </Row>
//   );
// }









"use client";

import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Button,
  Space,
  Form,
  Select,
  message,
} from "antd";
import Image from "next/image";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { requestOtp, verifyOtp } from "@/app/api/Auth";
import { useRouter } from "next/navigation";
import PhoneInput, { Country, Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import {
  parsePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import './login.css';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+86");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
const [form] = Form.useForm();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{ width: 70 }}
        defaultValue={"86"}
        value={countryCode}
        onChange={(value) => setCountryCode(value)}
        options={[
          { label: "+86", value: "86" },
          { label: "+87", value: "87" },
        ]}
      />
    </Form.Item>
  );

  const handleSendOtp = async () => {
    form.submit()
    if (!mobile || !isValidPhoneNumber(mobile)) return;
    const phoneNumber = parsePhoneNumber(mobile);
    if (!phoneNumber) return;
    try {
      setLoading(true);

      await requestOtp({
        phone: phoneNumber.nationalNumber,
        country_code: `+${phoneNumber.countryCallingCode}`,
        passenger: true,
      });
      message.success("OTP sent successfully");
      setStep("otp");
      setTimer(30);
      setOtp('');
      setCanResend(false);
    } catch (err: unknown) {
      message.error(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  /* OTP Timer */
  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) setCanResend(true);
  }, [step, timer]);

  // const handleSendOtp = () => {
  //   setStep('otp');
  //   setTimer(30);
  //   setCanResend(false);
  // };
  const router = useRouter();
  const handleVerifyOtp = async () => {
    if (!otp) return;

    try {
      setLoading(true);

      const response = await verifyOtp({
        phone: mobile,
        otp,
      });
      sessionStorage.setItem("token", response.access_token);
      router.push("/");
      console.log("Login success:", response);
      // redirect / store token here
    } catch (err: unknown) {
      message.error(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // const handleResendOtp = () => {
  //   setTimer(30);
  //   setCanResend(false);
  // };

  return (
    <Row style={{ minHeight: "100vh" }}>
      {/* LEFT IMAGE */}
      <Col
        xs={0}
        md={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // padding: 32, // ← UI breathing space
          animation: "slideFromLeft 1s ease forwards",
        }}
      >
        <div
          style={{
            position: "relative",
            marginTop: "80px",
            marginLeft: "90px",
            width: "80%",
            height: "80%",
            //   maxHeight: '85vh',
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/hero.png"
            alt="Dryva Login"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      </Col>

      {/* RIGHT CONTENT */}
      <Col
        xs={24}
        md={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "slideFromRight 1s ease forwards",
        }}
      >
        <div style={{ width: "100%", maxWidth: 380 }}>
          {step === "otp" && (
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => {
                setStep("mobile");
                setMobile("");
                setOtp("");
              }}
              style={{ marginBottom: "5px" }}
            >
              {" "}
              Back{" "}
            </Button>
          )}
          <Title level={2}>Welcome to Dryva</Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Enter your mobile number to start your journey
          </Text>

          <Space
            direction="vertical"
            size="large"
            style={{ width: "100%", marginTop: 24 }}
          >
            {/* MOBILE NUMBER */}
            {step === "mobile" && (
              <>
              <Form
  form={form}
  layout="vertical"
>
               <Form.Item
  name="mobile"
  rules={[
    // { required: true, message: 'Mobile number is required' },
     {
        validator: (_, value) =>
          value && isValidPhoneNumber(value)
            ? Promise.resolve()
            : Promise.reject(new Error('Enter a valid mobile number')),
      },
  ]}
>
  <PhoneInput
    defaultCountry="JM"
    international
    countryCallingCodeEditable={false}
    value={mobile}
    onChange={(value: Value) => {
      setMobile(value || '');
    }}
    // inputComponent={Input as any}
    // inputProps={{
    //   size: 'large',
    //   placeholder: 'Enter Mobile Number',
    //   style: {
    //     height: 90,
    //   },
    // }}
    placeholder="Enter Mobile Number"
  />
</Form.Item>

                <Button
                  type="primary"
                  size="large"
                  block
                  style={{ background: "#fe9900" }}
                  onClick={handleSendOtp}
                  // disabled={!mobile || !isValidPhoneNumber(mobile)}
                  loading={loading}
                >
                  Send OTP
                </Button>
                </Form>
                <Text style={{ display: "block" }}>
                  Don't have an account? <a href="/signup">Signup</a>
                </Text>
              </>
            )}

            {/* OTP */}
            {step === "otp" && (
              <>
                <Input.OTP
                  length={5}
                  size="large"
                  value={otp}
                  onChange={setOtp}
                />
                <Text type="secondary">
                  {canResend ? (
                    <Button type="link" onClick={handleSendOtp}>
                      Resend OTP
                    </Button>
                  ) : (
                    <>Resend OTP in {timer}s</>
                  )}
                </Text>

                <Button
                  type="primary"
                  size="large"
                  block
                  disabled={otp.length!=5}
                  style={{ background: "#fe9900" }}
                  onClick={handleVerifyOtp}
                  loading={loading}
                >
                  Verify & Login
                </Button>
              </>
            )}
          </Space>
        </div>
      </Col>

      {/* KEYFRAMES */}
      <style jsx global>{`
        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-120px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(120px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </Row>
  );
}
