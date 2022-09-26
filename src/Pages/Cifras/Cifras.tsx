import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React from 'react';

const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.cifraclub.com.br/ministerio-morada/so-tu-s-santo/">
                        Só tu és Santo
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.cifraclub.com.br/laura-souguellis/abba/">
                        Abba
                    </a>
                ),
            },
            {
                key: '3',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                        3rd menu item (disabled)
                    </a>
                ),
                disabled: true,
            },
            {
                key: '4',
                danger: true,
                label: 'a danger item',
            },
        ]}
    />
);

const Cifras: React.FC = () => (
    <Dropdown overlay={menu}>
        <a onClick={e => e.preventDefault()}>
            <Space>
                Cifras
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>
);

export default Cifras;