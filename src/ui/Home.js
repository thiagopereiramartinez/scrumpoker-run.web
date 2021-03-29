import '../App.css'

import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { CodeOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

export default function Home() {
    const history = useHistory();
    const handleOnJoin = () => {
        setIsPlayerNameSection(true);
        setPlayMethod('join')
    }
    const handleOnCreate = () => {
        setIsPlayerNameSection(true);
        setPlayMethod('create');
    }
    function join(host, pin) {
        axios.post(`https://api-test.scrumpoker.run/rooms/${pin}/join`, {
            player_name: playerName,
            host: host
        })
            .then(function (response) {
                message.success(`Room PIN is: ${response.data.room.pincode}`)
                history.push(`/${response.data.room.pincode}/${response.data.id}`)
            })
            .catch(function (error) {
                message.error(`Something went wrong: ${error.message}`)
            })
    }
    const handleOnStart = () => {
        switch (playMethod) {
            case 'create':
                //handle create
                axios.post('https://api-test.scrumpoker.run/rooms', {
                    name: playerName
                })
                    .then(function (response) {
                        join(true, response.data.pincode);
                    })
                    .catch(function (error) {
                        message.error(`Something went wrong: ${error.message}`)
                    })
                break;
            case 'join':
                //handle join
                join(false, pin);
                break;
            default:
                break;
        }
    }

    const [isPlayerNameSection, setIsPlayerNameSection] = useState(false);
    const [playMethod, setPlayMethod] = useState();
    const [playerName, setPlayerName] = useState();
    const [pin, setPin] = useState();

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
                    <Input placeholder="Enter pin code" prefix={<CodeOutlined />} onChange={(e) => setPin(e.target.value)} />
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
                    <Input placeholder="Player name" prefix={<UserOutlined />} onChange={(e) => setPlayerName(e.target.value)} />
                    <Button type="primary" style={{ marginTop: 24 }} onClick={handleOnStart}>Start</Button>
                    <Button type="text" style={{ marginTop: 24 }} onClick={() => setIsPlayerNameSection(false)}>Back</Button>
                </div>
            </div>
        </>;
    }

    return isPlayerNameSection ? PlayerName() : CreateOrJoin()
}