import "./List.css";

const List = ({ data }) => {
    return (
        <>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temperature</th>
                        <th>Wind</th>
                        <th>Snow</th>
                        <th>Max UV</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item["datetime"]}</td>
                            <td>{item["temp"]}</td>
                            <td>{item["wind_spd"]}</td>
                            <td>{item["snow"]}</td>
                            <td>{item["max_uv"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default List;