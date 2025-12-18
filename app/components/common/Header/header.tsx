"use client";

import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Space, Switch } from "antd";
import Link from "next/link";
import { useState } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { DropdownProps, MenuProps } from 'antd';
import { DownOutlined, LogoutOutlined, CreditCardOutlined, LockOutlined, CarOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
  // {
  //   key: '1',
  //   label: 'Profile',
  // },
  {
    key: '1',
    label: 'Cards',
    icon: <CreditCardOutlined />,
  },
  {
    key: '1',
    label: 'History',
    icon: <CarOutlined />,
  },
  {
    key: '2',
    label: 'Change Password',
    icon: <LockOutlined />,
  },
  // {
  //   type: 'divider',
  // },
  {
    key: '3',
    label: 'Logout',
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

export default function Header() {
   const sharedProps: DropdownProps = {
    menu: { items },
    placement: 'bottomLeft',
    classNames: { root: styles.root },
  };
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
    const token = typeof window !== "undefined" ? sessionStorage.getItem("token")  : null;

  const router = useRouter();
    const NavSignup = () => {
        router.push("/signup");
    };
  return (
    <header className={`${styles.header} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.logo}>
        <Image
          src="/images/dryva-logo.svg"
          alt="Dryva"
          width={100}
          height={50}
        />
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
              Username
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
        style={{visibility:'hidden'}}
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
        {token&& <><Link href="#" className={styles.navLink}>Cards</Link><br />
        <Link href="#" className={styles.navLink}>History</Link><br />
        <Link href="#" className={styles.navLink}>Change Password</Link><br />
        </>}

        {!token ?<Button type="primary" block style={{ marginTop: 2 }}>
          Sign Up
        </Button>
        :
        <Button color="danger" variant="solid" block style={{ marginTop: 2 }}>
          Logout
        </Button>}

      </Drawer>
    </header>
  );
}
