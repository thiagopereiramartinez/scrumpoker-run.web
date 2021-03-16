import '../App.css'

import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { CodeOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export default function Home() {
    const history = useHistory();
    const handleOnJoin = () => setIsPlayerNameSection(true);
    const handleOnCreate = () => setIsPlayerNameSection(true);
    const handleOnStart = () => history.push('/dashboard')

    const [isPlayerNameSection, setIsPlayerNameSection] = useState(false);

    function Logo() {
        return <div>
            <span className="logo">scrumpoker</span>
            <span className="logo" style={{ color: '#1890FF' }}>RUN</span>
        </div>;
    }

    function CreateOrJoin() {
        return <>
            <div className="site-bg">
                {Logo()}
                <div className="card">
                    <Input placeholder="Enter pin code" prefix={<CodeOutlined />} />
                    <Button type="primary" style={{ marginTop: 24 }} onClick={handleOnJoin}>Join Game</Button>
                    <h3 style={{ marginTop: 12 }}>Or</h3>
                    <Button onClick={handleOnCreate}>Create New Game</Button>
                </div>
            </div>
        </>;
    }

    function PlayerName() {
        return <>
            <div className="site-bg">
                {Logo()}
                <div className="card">
                    <Input placeholder="Player name" prefix={<UserOutlined />} />
                    <Button type="primary" style={{ marginTop: 24 }} onClick={handleOnStart}>Start</Button>
                    <Button type="text" style={{ marginTop: 24 }} onClick={() => setIsPlayerNameSection(false)}>Back</Button>
                </div>
            </div>
        </>;
    }

    return isPlayerNameSection ? PlayerName() : CreateOrJoin()
}