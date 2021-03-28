import '../App.css'

import React, { useState } from 'react';
import { Row, Col, Tag, Input, Button, Radio } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';

export default function Dashboard() {

    const [value, setValue] = useState();

    const onChange = e => {
        setValue(e.target.value);
    }

    return <>
        <div className="dashboard-bg">
            <Row>
                <Col span={18}>
                    <Row style={{ alignItems: 'center' }}>
                        <h1>PlayerName</h1>
                        <Tag color="blue" style={{ marginLeft: 8, marginBottom: 12 }}>HOST</Tag>
                    </Row>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Input placeholder="Topic" prefix={<ExperimentOutlined />} style={{ width: '60vh' }} />
                        <Button type="primary" style={{ marginLeft: 8 }}>New Topic</Button>
                    </div>
                </Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: 12 }}>
                    <h1>PIN: 2735</h1>
                </Col>
            </Row>
            <Row style={{ marginTop: 48 }}>
                <Col span={8}>
                    <Row style={{ alignItems: 'center' }}>
                        <h1>Current Topic</h1>
                        <Button type="primary" style={{ marginLeft: 8, marginBottom: 12 }}>Reveal</Button>
                    </Row>
                    <Radio.Group onChange={onChange} value={value} buttonStyle="solid" style={{  }}>
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
                <Col span={8} style={{ backgroundColor: 'yellow' }}>col-8</Col>
                <Col span={8} style={{ backgroundColor: 'brown' }}>col-8</Col>
            </Row>
        </div>
    </>;
}