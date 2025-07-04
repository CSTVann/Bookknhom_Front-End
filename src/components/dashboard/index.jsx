import React from "react";
import "../../assets/style/dashboard.css";

const Dashboard = () => {
    const dashboards = [
        { value: '388', name: 'Total Books', detail: '+8% from yesterday' },
        { value: '140', name: 'Total Exchange', detail: '+5% from yesterday' },
        { value: '45', name: 'Total User', detail: '+1,2% from yesterday' },
        { value: '8000$', name: 'Money Save', detail: '0,5% from yesterday' },
    ];
    const colorIcons = ['#FA5A7D', '#FF947A', '#3CD856', '#BF83FF'];
    const colors = ['#FFE2E5', '#FFF4DE', '#DCFCE7', '#F3E8FF'];
    const svgImages = [
        'bi bi-file-earmark-text-fill',
        'bi bi-tag-fill',
        'bi bi-person-plus-fill',
        'bi bi-file-bar-graph-fill',
    ];
    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                </div>
                <div className="list-dashboard">
                    {dashboards.map((dashboard, index) => (
                        <div key={index} className="dashboard-content">
                            <div className="dashboard-card" style={{ backgroundColor: colors[index] }}>
                                <div className={svgImages[index]} id="item-icon" style={{ backgroundColor: colorIcons[index] }}></div>
                                <h4 className="item-value">{dashboard.value}</h4>
                                <p className="value-name">{dashboard.name}</p>
                                <p className="value-detail">{dashboard.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
