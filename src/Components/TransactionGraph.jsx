import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export default function TransactionGraph({ data }) {
    return (
        <BarChart
            style={{ width: '100%', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={data}
            margin={{ top: 0, right: 30, left: 10, bottom: 60 }}
        >
            <XAxis dataKey="date" tick={{ angle: -90, dx: -2, dy: 34, fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="gray" strokeDasharray="5 5" />
            <Bar dataKey="totalAmount" fill="#2563EB" barSize={30} />
        </BarChart>
    )
}