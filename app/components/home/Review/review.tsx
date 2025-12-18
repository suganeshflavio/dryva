"use client";

import { Carousel, Card, Avatar } from "antd";
import styles from "./review.module.css";
import Image from "next/image";

    const googleReviews = [
  {
    id: 1,
    name: "Dominique Nassif",
    avatar: "D",
    color: "#2e7d32",
    time: "5 months ago",
    review:
      "I am pleasantly impressed with the overall services provided everything from booking to the driving experience was pleasant and professional. It’s truly the best value for money!",
  },
  {
    id: 2,
    name: "Melissa Powell",
    avatar: "M",
    color: "#0b5aa2",
    time: "5 months ago",
    review:
      "Dryva has been a lifesaver for me. The application allows various options of service. Top tier service. 100% recommend.",
  },
  {
    id: 3,
    name: "Alex Johnson",
    avatar: "A",
    color: "#6a1b9a",
    time: "4 months ago",
    review:
      "Professional drivers, clean cars, and punctual service. Highly recommended.",
  },
   {
    id: 2,
    name: "Melissa Powell",
    avatar: "M",
    color: "#0b5aa2",
    time: "5 months ago",
    review:
      "Dryva has been a lifesaver for me. The application allows various options of service. Top tier service. 100% recommend.",
  },
  {
    id: 3,
    name: "Alex Johnson",
    avatar: "A",
    color: "#6a1b9a",
    time: "4 months ago",
    review:
      "Professional drivers, clean cars, and punctual service. Highly recommended.",
  },
   {
    id: 2,
    name: "Melissa Powell",
    avatar: "M",
    color: "#0b5aa2",
    time: "5 months ago",
    review:
      "Dryva has been a lifesaver for me. The application allows various options of service. Top tier service. 100% recommend.",
  },
  {
    id: 3,
    name: "Alex Johnson",
    avatar: "A",
    color: "#6a1b9a",
    time: "4 months ago",
    review:
      "Professional drivers, clean cars, and punctual service. Highly recommended.",
  },
];
export default function Review() {

  return (
    <section className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <Image src="/images/google_review.png" alt="Google" height={50} width={150}/>
        {/* <span>Reviews</span>
        <div className={styles.stars}>★★★★★</div> */}
      </div>

      {/* Carousel */}
      <Carousel
        autoplay
        autoplaySpeed={1500}
        dots
        draggable
        slidesToShow={3}
        slidesToScroll={1}
        responsive={[
          {
            breakpoint: 1024,
            settings: { slidesToShow: 2 },
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 1 },
          },
        ]}
      >
        {googleReviews.map((item) => (
          <div key={item.id} className={styles.slide}>
            <Card className={styles.card}>
              <div className={styles.stars}>★★★★★</div>

              <p className={styles.review}>{item.review}</p>

              <div className={styles.user}>
                <Avatar
                  style={{
                    backgroundColor: item.color,
                    fontWeight: 600,
                  }}
                >
                  {item.avatar}
                </Avatar>
                <div>
                  <strong>{item.name}</strong>
                </div>
                  <span>{item.time}</span>
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
