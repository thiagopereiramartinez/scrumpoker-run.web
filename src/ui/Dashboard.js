import '../App.css'

import React, { useEffect, useState } from 'react';
import { Row, Col, Tag, Input, Button, Radio, List, message } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import axios from 'axios';

export default function Dashboard() {

    let { pin, player_id } = useParams();

    const [value, setValue] = useState();

    const onChange = e => {
        setValue(e.target.value);
        vote(e.target.value);
    }

    const onReveal = () => {
        axios.get(`https://api-test.scrumpoker.run/votings/${pin}`)
            .then(function (response) {
                let _players = players.map(p => ({
                    ...response.data.find((v) => (v.player_id === p.id) && v),
                    ...p
                }))
                setPlayersWithVotes(_players)
            })
            .catch(function (error) {
                message.error(`Something went wrong while retriving the votes, details: ${error}`)
            })
    }

    const [playerName, setPlayerName] = useState();
    const [isHost, setIsHost] = useState(false);
    const [topic, setTopic] = useState();
    const [players, setPlayers] = useState();
    const [playersWithVotes, setPlayersWithVotes] = useState();
    var localTopic = ''

    function resetVotes() {
        axios.delete(`https://api-test.scrumpoker.run/votings/${pin}/reset`)
            .catch(function (error) {
                message.error(`Something went wrong while reseting the votes, details: ${error}`)
            })
    }

    function newTopic(topic) {
        axios.put(`https://api-test.scrumpoker.run/rooms/${pin}/topic`, {
            topic: topic
        })
            .then(function () {
                setTopic(topic)
            })
            .catch(function (error) {
                message.error(`Something went wrong while seting the new topic, details: ${error}`)
            })
    }

    function vote(value) {
        axios.post(`https://api-test.scrumpoker.run/votings/${pin}`, {
            player_id: player_id,
            value: value
        })
            .catch(function (error) {
                message.error(`Something went wrong while voting, details: ${error}`)
            })
    }

    useEffect(() => {
        axios.get(`https://api-test.scrumpoker.run/rooms/${pin}`)
            .then(function (response) {
                setTopic(response.data.topic)
            })
            .catch(function (error) {
                message.error(`Something went wrong while retriving room informations, details: ${error}`)
            })

        axios.get(`https://api-test.scrumpoker.run/rooms/${pin}/players`)
            .then(function (response) {
                setPlayers(response.data)
                setPlayersWithVotes(response.data)
                let current_player = response.data.find(element => element.id === player_id);
                setPlayerName(current_player.name)
                setIsHost(current_player.host)
            })
            .catch(function (error) {
                message.error(`Something went wrong while retriving the players list, details: ${error}`)
            })
    }, [pin, player_id])

    const handleNewTopic = () => {
        resetVotes();
        newTopic(localTopic);
    }

    function translateValue(value) {
        switch (value) {
            case 1:
                return '0'
            case 2:
                return '1/2'
            case 3:
                return '1'
            case 4:
                return '2'
            case 5:
                return '3'
            case 6:
                return '5'
            case 7:
                return '8'
            case 8:
                return '13'
            case 9:
                return '20'
            case 10:
                return '40'
            case 11:
                return '100'
            case 12:
                return '?'
            default:
                return ''
        }
    }

    return <>
        <div className="dashboard-bg">
            <Row>
                <Col span={18}>
                    <Row style={{ alignItems: 'center' }}>
                        <h1>{playerName}</h1>
                        <Tag color="blue" style={{ marginLeft: 8, marginBottom: 12, visibility: isHost ? 'visible' : 'hidden' }}>HOST</Tag>
                    </Row>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Input placeholder="Topic" prefix={<ExperimentOutlined />} style={{ width: '60vh', visibility: isHost ? 'visible' : 'hidden' }} onChange={(e) => { localTopic = e.target.value }} />
                        <Button type="primary" style={{ marginLeft: 8, visibility: isHost ? 'visible' : 'hidden' }} onClick={handleNewTopic}>New Topic</Button>
                    </div>
                </Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: 12 }}>
                    <h1>PIN: {pin}</h1>
                </Col>
            </Row>
            <Row style={{ marginTop: 48 }}>
                <Col span={8}>
                    <Row style={{ alignItems: 'center' }}>
                        <h1>{topic}</h1>
                        <Button type="primary" style={{ marginLeft: 8, marginBottom: 12 }} onClick={onReveal}>Reveal</Button>
                    </Row>
                    <Radio.Group onChange={onChange} value={value} buttonStyle="solid">
                        <Radio.Button value={1} className="votecard">0</Radio.Button>
                        <Radio.Button value={2} className="votecard">1/2</Radio.Button>
                        <Radio.Button value={3} className="votecard">1</Radio.Button>
                        <Radio.Button value={4} className="votecard">2</Radio.Button>
                        <Radio.Button value={5} className="votecard">3</Radio.Button>
                        <Radio.Button value={6} className="votecard">5</Radio.Button>
                        <Radio.Button value={7} className="votecard">8</Radio.Button>
                        <Radio.Button value={8} className="votecard">13</Radio.Button>
                        <Radio.Button value={9} className="votecard">20</Radio.Button>
                        <Radio.Button value={10} className="votecard">40</Radio.Button>
                        <Radio.Button value={11} className="votecard">100</Radio.Button>
                        <Radio.Button value={12} className="votecard">?</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col span={8}>
                        <h1>Players</h1>
                    <List
                        dataSource={playersWithVotes}
                        renderItem={item => (
                            <List.Item>
                                <div>
                                    {item.name}
                                    <Tag color="blue" style={{ marginLeft: 8, visibility: item.value === undefined ? 'hidden' : 'visible' }}>{translateValue(item.value)}</Tag>
                                </div>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={8}></Col>
            </Row>
        </div>
    </>;
}