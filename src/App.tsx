import {ChartContainer} from "./components/chartContainer/ChartContainer.tsx";
import rawJson from "./data/data.json";
import {prepareData} from "./utils/prepareData";

type RawVariation = {
    id?: number;
    name: string;
};

const raw = rawJson as { variations: RawVariation[] };

const variations = raw.variations.map(v => ({
    ...v,
    id: v.id !== undefined ? String(v.id) : "0"
}));

function App() {
    const data = prepareData();

    return (
        <ChartContainer data={data} variations={variations}/>
    );
}

export default App;
