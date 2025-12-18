'use client';

import React, { useState } from 'react';
import { Card, Typography, Button, Space } from 'antd';
import { CreditCardOutlined, PlusOutlined } from '@ant-design/icons';
import AddCardForm from './AddCardForm';
// import { SavedCard } from './types';

const { Text } = Typography;

interface SavedCard {
  id: string;
  last4: string;
  brand: 'Visa' | 'Mastercard';
  expiry: string;
}

interface Props {
  onDone: () => void;
}

const CardSelector: React.FC<Props> = ({ onDone }) => {
  const [cards, setCards] = useState<SavedCard[]>([
    { id: '1', last4: '4242', brand: 'Visa', expiry: '12/26' },
    { id: '2', last4: '1881', brand: 'Mastercard', expiry: '08/25' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  if (showAddForm) {
    return (
      <AddCardForm
        onCancel={() => setShowAddForm(false)}
        onSave={(card) => {
          setCards([...cards, card]);
          setShowAddForm(false);
        }}
      />
    );
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={16}>
      {cards.map((card) => (
        <Card key={card.id} hoverable>
          <Space>
            <CreditCardOutlined />
            <Text>
              {card.brand} •••• {card.last4} ({card.expiry})
            </Text>
          </Space>
        </Card>
      ))}

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
        onClick={onDone}
      >
        Continue
      </Button>
    </Space>
  );
};

export default CardSelector;
