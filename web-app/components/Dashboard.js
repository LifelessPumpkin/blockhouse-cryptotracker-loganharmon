'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Button from './Button'

export default function Dashboard() {
    const { currentUser, userDataObj } = useAuth()
    const [data, setData] = useState({})

    useEffect(() => {
        if (!currentUser || !userDataObj) {
            return
        }
        setData(userDataObj)
    }, [currentUser, userDataObj])

    const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
    const [price, setPrice] = useState(null);
    const [searchInput, setSearchInput] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSelection = (event) => {
        setSelectedCrypto(event.target.value);
        // Clear search input when selecting from radio buttons
        setSearchInput("");
    };

    const handleSearch = () => {
        if (searchInput.trim() !== "") {
            // Close any existing WebSocket connection before creating a new one
            setLoading(true);
            setError(false);
            setPrice(null);
            // This is the key line - update selectedCrypto with the search term
            setSelectedCrypto(searchInput.toLowerCase());
        }
    };

    // Handle Enter key press in search input
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        if (!selectedCrypto) return;

        // Always set loading to true when selectedCrypto changes
        setLoading(true);
        setError(false);
        setPrice(null);

        const lowerCaseCrypto = selectedCrypto.toLowerCase();
        
        // Create a new WebSocket connection
        const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${lowerCaseCrypto}`);

        let dataReceived = false;
        const timeout = setTimeout(() => {
            if (!dataReceived) {
                setLoading(false);
                setError(true);
                pricesWs.close();
            }
        }, 10000); // 10 second timeout

        pricesWs.onmessage = function (msg) {
            try {
                const data = JSON.parse(msg.data);
                dataReceived = true;
                
                if (data[lowerCaseCrypto]) {
                    setPrice(data[lowerCaseCrypto]);
                    setLoading(false);
                } else {
                    // If we get a response but no data for our crypto
                    setError(true);
                    setLoading(false);
                }
            } catch (e) {
                setError(true);
                setLoading(false);
            }
        };

        pricesWs.onclose = () => {
            setLoading(false);
            clearTimeout(timeout);
        };

        pricesWs.onerror = () => {
            setError(true);
            setLoading(false);
            clearTimeout(timeout);
        };

        // Clean up function
        return () => {
            clearTimeout(timeout);
            pricesWs.close();
        };
    }, [selectedCrypto]); // Re-run when selectedCrypto changes

    return (
        <div className="grid grid-cols-2 grid-rows-2 w-fit gap-2 justify-center mx-auto mh-auto px-2">
            {/* Top Left: Search Button */}
            <div className="col-span-1 row-span-1 flex justify-left">
                <Button text="Search" onClick={handleSearch} />
            </div>

            {/* Top Right: Search Bar */}
            <div className="col-span-2 row-span-1 flex w-fit justify-right max-w-[150px] px-2">
                <div className="form__group field">
                    <input
                        type="input"
                        className="form__field"
                        placeholder="Search"
                        required=""
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <label htmlFor="name" className="form__label">Search Crypto!</label>
                </div>
            </div>

            {/* Bottom Left: Radio List */}
            <div className="col-span-1 row-span-2 flex justify-right w-fit">
                <div className="radio-input flex flex-col gap-2">
                    <label className="label">
                        <input
                            type="radio"
                            id="value-1"
                            name="value-radio"
                            value="bitcoin"
                            checked={selectedCrypto === "bitcoin"}
                            onChange={handleSelection}
                        />
                        <p className="text">Bitcoin</p>
                    </label>
                    <label className="label">
                        <input
                            type="radio"
                            id="value-2"
                            name="value-radio"
                            value="ethereum"
                            checked={selectedCrypto === "ethereum"}
                            onChange={handleSelection}
                        />
                        <p className="text">Ethereum</p>
                    </label>
                    <label className="label">
                        <input
                            type="radio"
                            id="value-3"
                            name="value-radio"
                            value="dogecoin"
                            checked={selectedCrypto === "dogecoin"}
                            onChange={handleSelection}
                        />
                        <p className="text">Dogecoin</p>
                    </label>
                    <label className="label">
                        <input
                            type="radio"
                            id="value-4"
                            name="value-radio"
                            value="tether"
                            checked={selectedCrypto === "tether"}
                            onChange={handleSelection}
                        />
                        <p className="text">Tether</p>
                    </label>
                    <label className="label">
                        <input
                            type="radio"
                            id="value-5"
                            name="value-radio"
                            value="solana"
                            checked={selectedCrypto === "solana"}
                            onChange={handleSelection}
                        />
                        <p className="text">Solana</p>
                    </label>
                </div>
            </div>

            {/* Bottom Right: Card (Display Selected Crypto & Price) */}
            <div className="flex justify-end w-fit">
                <div className="card text-center p-4 border rounded-lg shadow-md">
                    <p className="heading font-bold text-lg">{selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)}</p>
                    <p className="text-gray-500">Current Price:</p>
                    {loading ? (
                        <p className="text-gray-700">Loading...</p>
                    ) : error ? (
                        <p className="text-gray-700">Error fetching price</p>
                    ) : price ? (
                        <p className="text-gray-700">${parseFloat(price).toFixed(2)}</p>
                    ) : (
                        <p className="text-gray-700">No data available</p>
                    )}
                </div>
            </div>
        </div>
    );
}