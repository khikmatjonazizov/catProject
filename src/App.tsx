import React, { useCallback, useEffect, useState } from 'react';
import styled from "styled-components";
import { Checkbox } from "./components/Checkbox";
import { Button } from "./components/Button";
import { Cat } from "./components/Cat";
import { Loader } from "./components/Loader";

const AppWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 10px;
  display: grid;
  row-gap: 10px;
`;

function App() {
    const [catData, setCatData] = useState({
        loading: false,
        id: '',
        url: '',
        width: 0,
        height: 0,
    });
    const [isEnabled, setIsEnabled] = useState(true);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

    const onChange = (key: 'autoRefresh' | 'isEnabled') => {
        if (key === 'isEnabled') {
            setIsEnabled(prev => !prev);
        } else {
            setAutoRefresh(prev => !prev)
        }
    }
    const getCat = useCallback(async () => {
        if (!catData.loading) {
            setCatData(prev => ({...prev, loading: true}))
            const response = await fetch('https://api.thecatapi.com/v1/images/search?format=json', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'live_5Zgrh7smRNyuvOlal0mzTvYwKwMQ5v4cPbaOpuV4nHTFUjpmTwnIelAlPjcGB8LS',
                }
            })
            const data = await response.json()
            setCatData({
                loading: false,
                url: data[0].url,
                height: data[0].height,
                width: data[0].width,
                id: data[0].id,
            })
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getCat();
    }, [getCat])

    useEffect(() => {
        if (autoRefresh && isEnabled) {
            const id = setInterval(() => getCat(), 5000)
            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(undefined);
        }
        // eslint-disable-next-line
    }, [autoRefresh, isEnabled, getCat])
    return (
        <AppWrapper>
            <Checkbox
                onChange={() => onChange('isEnabled')}
                isChecked={isEnabled}
                label="Enabled"
            />
            <Checkbox
                onChange={() => onChange('autoRefresh')}
                isChecked={autoRefresh}
                label="Auto-refresh every 5 seconds"
            />
            <Button onClick={() => getCat()} disabled={catData.loading || !isEnabled}>Get cat</Button>
            {
                isEnabled && (
                    catData.loading ?
                        <Loader/> :
                        <Cat url={catData.url}/>
                )
            }
        </AppWrapper>
    );
}

export default App;
