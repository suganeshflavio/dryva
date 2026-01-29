// 'use client';

// import React from 'react';
// import { Form, Input, Button, Row, Col, Typography } from 'antd';

// interface Props {
//   onCancel: () => void;
//   onSave: (card: any) => void;
//   CardId: string | null;
// }

// const AddCardForm: React.FC<Props> = ({ onCancel, onSave, CardId }) => {
//   const [form] = Form.useForm();
//   const { Title } = Typography;
//   const formatCard = (v: string) =>
//     v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

//   const formatExpiry = (v: string) =>
//     v.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d{0,2})/, '$1/$2');

//   const submit = async () => {
//     const values = await form.validateFields();
//     onSave({
//       id: Date.now().toString(),
//       last4: values.cardNumber.slice(-4),
//       brand: 'Visa',
//       expiry: values.expiry,
//     });
//   };

//   return (
//     <Form layout="vertical" form={form}>
//     {/* <Title level={4}>Add Card</Title> */}
//       <Form.Item
//         label="Card Number"
//         name="cardNumber"
//         rules={[
//           { required: true, message: 'Please enter card number' },
//           { pattern: /^\d{4} \d{4} \d{4} \d{4}$/, message: 'Card number must be 16 digits'},
//         ]}
//       >
//         <Input
//           placeholder="XXXX XXXX XXXX XXXX"
//           maxLength={19}
//           onChange={(e) =>
//             form.setFieldsValue({ cardNumber: formatCard(e.target.value) })
//           }
//         />
//       </Form.Item>

//       <Row gutter={12}>
//         <Col span={12}>
//           <Form.Item
//             label="Expiry"
//             name="expiry"
//             rules={[
//               { required: true, message: 'Please enter expiry date' },
//               { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Expiry must be in MM/YY format'},
//             ]}
//           >
//             <Input
//               placeholder="MM/YY"
//               maxLength={5}
//               onChange={(e) =>
//                 form.setFieldsValue({ expiry: formatExpiry(e.target.value) })
//               }
//             />
//           </Form.Item>
//         </Col>

//         <Col span={12}>
//           <Form.Item
//             label="CVV"
//             name="cvv"
//             rules={[{ required: true, message: 'Please enter CVV' }, { pattern: /^\d{3}$/, message: 'CVV must be 3 digits' }]}
//           >
//             <Input.Password maxLength={3} placeholder='XXX'/>
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={12}>
//         <Col span={12}>
//           <Button block onClick={onCancel}>
//             Cancel
//           </Button>
//         </Col>
//         <Col span={12}>
//           <Button block type="primary" style={{ background: '#fe9900' }} onClick={submit}>
//             Save Card
//           </Button>
//         </Col>
//       </Row>
//     </Form>
//   );
// };

// export default AddCardForm;


'use client';

import { useEffect, useRef, useState } from 'react';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { Button, Typography, Spin, message } from 'antd';
import { getHeaders } from '@/app/api/Header';

const { Title } = Typography;

let stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

export default function AddCardStripe({
  onSave,
  onCancel,
}: {
  onSave: () => void;
  onCancel: () => void;
}) {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [card, setCard] = useState<StripeCardElement | null>(null);
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initStripe = async () => {
      const stripeInstance = await stripePromise;
      if (!stripeInstance || !cardRef.current) return;

      const elements = stripeInstance.elements();
      const cardElement = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
          },
        },
      });

      cardElement.mount(cardRef.current);

      setStripe(stripeInstance);
      setCard(cardElement);
    };

    initStripe();
  }, []);

  const addCard = async () => {
    if (!stripe || !card) return;
    setLoading(true);

    try {
      // 1️⃣ Create SetupIntent
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dryva-passenger/payment/store_card`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      const data = await res.json();
      const clientSecret = data.clientSecret || data.client_secret;
      if (!clientSecret) {
        message.error('Missing client_secret');
      }

      const { setupIntent, error } = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: card,
          },
        }
      );

      if (error) {
        message.error(error.message || 'Card verification failed');
        setLoading(false);
        return;
      }

      const paymentMethodId = setupIntent?.payment_method as string;

      // 3️⃣ Save payment method
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dryva-passenger/payment/payment_method_id`,
        {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({ payment_method_id: paymentMethodId }),
        }
      );

      message.success('Card added successfully');
      setTimeout(onSave, 800);
    } catch {
      message.error('Failed to add card');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={4}>Add Card</Title>

      <div
        ref={cardRef}
        id="card-element"
        style={{
          padding: 12,
          border: '1px solid #ccc',
          borderRadius: 6,
          marginBottom: 16,
        }}
      />
      <div style={{ display: 'flex', gap: 12 }}>
        <Button block onClick={onCancel}>
          Cancel
        </Button>

        <Button
          block
          type="primary"
          style={{ background: '#fe9900' }}
          onClick={addCard}
          disabled={loading}
        >
          {loading ? <Spin /> : 'Save Card'}
        </Button>
      </div>
    </div>
  );
}

