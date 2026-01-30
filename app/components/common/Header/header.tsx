"use client";

import { useEffect, useState } from "react";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Modal, Space, Switch } from "antd";
import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { DropdownProps, MenuProps } from 'antd';
import { DownOutlined, LogoutOutlined, CreditCardOutlined, LockOutlined, CarOutlined } from '@ant-design/icons';
import { GetPassengerDetails } from "@/app/api/Ride";
import CardSelector from "../../Cards/CardSelector";


type Step = "ride" | "card";

const items: MenuProps['items'] = [
  // {
  //   key: '1',
  //   label: 'Profile',
  // },
  {
    key: 'cards',
    label: 'Cards',
    disabled: false,
    icon: <CreditCardOutlined />,
  },
  {
    key: 'history',
    label: 'History',
    disabled: false,
    icon: <CarOutlined />,
  },
  {
    key: 'change-password',
    label: 'Change Password',
    disabled: true,
    icon: <LockOutlined />,
  },
  // {
  //   type: 'divider',
  // },
  {
    key: 'logout',
    label: 'Logout',
    disabled: false,
    icon: <LogoutOutlined />,
    danger: true,
  },
];

const functionStyles: DropdownProps['styles'] = (info) => {
  const { props } = info;
  const isClick = props.trigger?.includes('click');
  if (isClick) {
    return {
      root: {
        borderColor: '#1890ff',
        borderRadius: '8px',
      },
    } satisfies DropdownProps['styles'];
  }
  return {};
};

interface UserDetails {
  _id: string;
  company_id: string;
  stripe_customer_id: string;
  payment_method_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_code: string;
  flag_code: string;
  currency_code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
};


export default function Header() {
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'cards':
        // router.push('/cards');
        setIsCardOpen(true);
        break;
      case 'history':
        router.push('/history');
        break;
      case 'change-password':
        router.push('/change-password');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };
  const sharedProps: DropdownProps = {
    menu: { items, onClick: handleMenuClick },
    placement: 'bottomLeft',
    classNames: { root: styles.root },
  };
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [userName, setUserName] = useState<UserDetails | null>(null);
const [isCardOpen, setIsCardOpen] = useState(false);

  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setOpen(false);
    router.push('/login'); // Redirect to login page after logout
  };

  const router = useRouter();
  const NavSignup = () => {
    router.push("/signup");
  };
  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const res = await GetPassengerDetails();
          setUserName(res);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      };
      fetchUser();
    }
  }, [token])
  return (
    <header className={`${styles.header} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.logo}>
        <Link href="/"><Image
          src="/images/dryva-logo.svg"
          alt="Dryva"
          width={100}
          height={50}
        /></Link>
      </div>

      {/* Desktop Menu */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/about" className={styles.navLink}>About Us</Link>
        <Link href="/faq" className={styles.navLink}>FAQ</Link>
        {!token ?
          <>
            <Link href="/login" className={styles.navLink}>Login</Link>
            <Button className={styles.signupBtn} onClick={NavSignup}>Sign Up</Button>
          </>
          :
          // <Switch
          //   checked={darkMode}
          //   onChange={() => setDarkMode(!darkMode)}
          //   style={{visibility:'hidden'}}
          // />
          <Dropdown {...sharedProps} styles={functionStyles} trigger={['click']}>
            <Button type="primary" className={styles.signupBtn}>
              <Space>
                {/* <UserOutlined /> */}
                {userName?.first_name}{userName?.last_name}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        }
      </nav>
      {/* Mobile */}
      <div className={styles.mobileMenu}>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          style={{ visibility: 'hidden' }}
        />
        <MenuOutlined onClick={() => setOpen(true)} />
      </div>

      <Drawer
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        closeIcon={<CloseOutlined style={{ color: '#fff', fontSize: 18 }} />}
        styles={{
          body: {
            backgroundColor: '#000',
          },
          header: {
            backgroundColor: '#000',
            borderBottom: '1px solid #222',
          },
        }}
      >
        <Link href="/" className={styles.navLink}>Home</Link><br />
        <Link href="/about" className={styles.navLink}>About Us</Link><br />
        <Link href="/faq" className={styles.navLink}>FAQ</Link><br />
        {!token && <><Link href="/login" className={styles.navLink}>Login</Link><br /></>}
        {token && <><Link href="#" className={styles.navLink}>Cards</Link><br />
          <Link href="#" className={styles.navLink}>History</Link><br />
          <Link href="#" className={styles.navLink}>Change Password</Link><br />
        </>}

        {!token ? <Button type="primary" block style={{ marginTop: 2 }}>
          Sign Up
        </Button>
          :
          <Button color="danger" variant="solid" block style={{ marginTop: 2 }} onClick={() => handleLogout}>
            Logout
          </Button>}

      </Drawer>
      {/* {step === "card" && ( */}
        <>
          {/* <CardSelector
            onDone={() => setStep("ride")}
          /> */}
          <Modal
  open={isCardOpen}
  onCancel={() => setIsCardOpen(false)}
  footer={null}
  width={700}
  destroyOnClose
>
  <CardSelector
    onDone={() => setIsCardOpen(false)}
  />
</Modal>
        </>
      {/* )} */}
    </header>
  );
}
