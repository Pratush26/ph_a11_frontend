import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const buildChartData = (graphicalData) => {
    const map = {};

    ["pending", "resolved", "closed"].forEach(status => {
        graphicalData[status].forEach(({ _id, count }) => {
            if (!map[_id]) {
                map[_id] = {
                    date: _id,
                    pending: 0,
                    resolved: 0,
                    closed: 0
                };
            }
            map[_id][status] = count;
        });
    });

    return Object.values(map);
};

export default function DashboardGraph({ data }) {
    const chartData = buildChartData(data);
    return (
        <LineChart
            style={{ width: '100%', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={chartData}
            margin={{ top: 0, right: 30, left: 10, bottom: 20 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ angle: -90, dx: -2, dy: 34, fontSize: 12 }} />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pending" stroke="#2563EB" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="resolved" stroke="#10B981" />
            <Line type="monotone" dataKey="closed" stroke="#6B7280" />
        </LineChart>
    )
}