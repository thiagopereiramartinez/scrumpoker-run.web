import '../App.css'

import React from 'react';
import { Row, Col, Tag, Input, Button } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';

export default function Dashboard() {
    return <>
        <div className="dashboard-bg">
            <Row>
                <Col span={18}>
                    <Row style={{ alignItems: 'center' }}>
                        <h1>PlayerName</h1>
                        <Tag color="blue" style={{ marginLeft: 8, marginBottom: 12 }}>HOST</Tag>
                    </Row>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Input placeholder="Topic" prefix={<ExperimentOutlined />} style={{ width: '60vh' }}/>
                        <Button type="primary" style={{ marginLeft: 8 }}>New Topic</Button>
                    </div>
                </Col>
                <Col span={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <h1>PIN: 2735</h1>
                </Col>
            </Row>
            <Row style={{ marginTop: 48 }}>
                <Col span={8} style={{ backgroundColor: 'green'}}>col-8</Col>
                <Col span={8} style={{ backgroundColor: 'yellow'}}>col-8</Col>
                <Col span={8} style={{ backgroundColor: 'brown' }}>col-8</Col>
            </Row>
        </div>
    </>;
}