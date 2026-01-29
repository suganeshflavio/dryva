'use client';

import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Space, message, Spin } from 'antd';
import { CreditCardOutlined, PlusOutlined } from '@ant-design/icons';
import AddCardForm from './AddCardForm';
import { GetStoreCard } from '@/app/api/Ride';
import { CardDetails, VehicleEstimate } from '@/app/Types/AddRide';

const { Text, Title } = Typography;

interface SavedCard {
  id: string;
  last4: string;
  brand: 'visa' | 'mastercard';
  expiry: string;
}

interface Props {
  onDone: () => void;
  selected?: VehicleEstimate;
  cardId: string | null;
  onCardSelect: (cardId: string) => void;
}

const CardSelector: React.FC<Props> = ({ onDone, selected, cardId, onCardSelect }) => {
  const [cards, setCards] = useState<CardDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsloading] = useState<Boolean>(false);
  const [CardId, setCardId] = useState<string | null>(null);

  const handleContinue = () => {
    if (CardId === null) {
      message.error('Please add at least one card to continue.');
      return;
    }
    onDone();
  }

  const handleClick = (cardId: string) => {
    setCardId(cardId);
    onCardSelect(cardId);
  }

  // if (showAddForm) {
  //   return (
  //     <AddCardForm
  //       onCancel={() => setShowAddForm(false)}
  //       onSave={(card) => {
  //         setCards([...cards, card]);
  //         setShowAddForm(false);
  //       }}
  //     />
  //   );
  // }

  const refunction = async () => {
    setIsloading(true);
    try {
      const res = await GetStoreCard();
      setCards(res);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsloading(false);
    };
  };

  useEffect(() => {
    // if(estimates.length > 0){
    const fetchCards = async () => {
      setIsloading(true);
      try {
        const res = await GetStoreCard();
        setCards(res);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsloading(false);
      };
    };
    fetchCards();
  }, []);

  return (
    <>
      {showAddForm ? (
        <AddCardForm
          onCancel={() => setShowAddForm(false)}
          onSave={() => {
            // setCards([...cards, card]);
            setShowAddForm(false);
            refunction();
          }}
        // CardId={CardId}
        />
      )
        : (
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Title level={4}>Select Card</Title>
            {
              isLoading &&
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <Spin size="large" />
              </div>
            }
            {cards.length > 0 ?
              cards.map((card) => (
                <Card key={card.id}
                  hoverable
                  onClick={() => handleClick(card.id)}
                  style={{
                    border:
                      CardId === card.id
                        ? '2px solid #fe9900'
                        : '1px solid #f0f0f0',
                    borderRadius: 12,
                  }}
                >
                  <Space>
                    <CreditCardOutlined />
                    <Text>
                      {card.brand} •••• {card.last4} ({card.exp_month}/{card.exp_year})
                    </Text>
                  </Space>
                </Card>
              ))
              : !isLoading && <Text type="danger" style={{ textAlign: 'center' }}>{error || 'No cards available'}</Text>}

            <Button
              icon={<PlusOutlined />}
              block
              onClick={() => setShowAddForm(true)}
            >
              Add New Card
            </Button>

            <Button
              type="primary"
              block
              style={{ background: '#fe9900' }}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Space>
        )}
    </>
  );
};

export default CardSelector;
