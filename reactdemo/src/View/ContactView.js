import React from "react";
import { Layout, Menu, Table, Tag } from 'antd';
import {
    DesktopOutlined,
    BarsOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

class ContactView extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const students = [
            {"name": "李华", "flag": true, "instructor": "导师1", "project": "项目1"},
            {"name": "小明", "flag": true, "instructor": "导师1", "project": "项目2"},
            {"name": "小红", "flag": true, "instructor": "导师2", "project": "项目3"},
            {"name": "小强", "flag": false, "instructor": "导师3", "project": "项目4"},
            {"name": "小张", "flag": false, "instructor": "导师4", "project": "项目5"},
            {"name": "小李", "flag": true, "instructor": "导师5", "project": "项目6"}
        ]
        const columns = [
            {title: "姓名", dataIndex: "name"},
            {title: "状态", dataIndex: "flag", render: record => (record) ? <Tag color={"green"}>已完成</Tag> : <Tag color={"red"}>未完成</Tag> },
            {title: "导师", dataIndex: "instructor"},
            {title: "毕业设计课题", dataIndex: "project"}
        ]
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<BarsOutlined />}>
                            毕业设计流程学生情况
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            管理学生
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <div>
                            <h1>中期检查</h1>
                        </div>
                        <Table dataSource={students} columns={columns}/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default ContactView;
