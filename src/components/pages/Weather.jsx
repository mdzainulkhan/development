import { useState, useEffect } from "react"

function Weather() {

    const API_KEY =
        import.meta.env.VITE_OPENWEATHER_API_KEY ||
        "15d08c3ba3217872828e4067fee10018"

    const [city, setCity] = useState("Delhi")
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [localTimeStr, setLocalTimeStr] = useState("")

    const updateLocalTime = (data) => {

        if (data?.dt != null && data?.timezone != null) {

            const localEpochMs =
                (data.dt + data.timezone) * 1000

            const dtLocal = new Date(localEpochMs)

            const pad = (n) =>
                n.toString().padStart(2, "0")

            const hours = pad(dtLocal.getUTCHours())
            const minutes = pad(dtLocal.getUTCMinutes())
            const day = dtLocal.getUTCDate()

            const month =
                dtLocal.toUTCString().split(" ")[2]

            const year = dtLocal.getUTCFullYear()

            setLocalTimeStr(
                `${day} ${month} ${year} • ${hours}:${minutes}`
            )

        } else {

            setLocalTimeStr("")

        }
    }

    const fetchWeather = async (
        e,
        customCity
    ) => {

        if (e) e.preventDefault()

        const cityName = customCity || city

        if (!cityName.trim()) {

            setError("Please enter a city")
            return

        }

        setLoading(true)
        setError("")

        try {

            const url =
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                    cityName
                )}&appid=${API_KEY}&units=metric`

            const res = await fetch(url)

            if (!res.ok) {

                const errData =
                    await res.json().catch(() => ({}))

                if (res.status === 401) {

                    throw new Error(
                        "Invalid API key"
                    )

                }

                const msg =
                    errData.message ||
                    `Weather lookup failed (${res.status})`

                throw new Error(msg)
            }

            const data = await res.json()

            setWeather(data)

            updateLocalTime(data)

        } catch (err) {

            setError(err.message)

        } finally {

            setLoading(false)

        }
    }

    const fetchWeatherByCoords =
        async (lat, lon) => {

            setLoading(true)
            setError("")

            try {

                const url =
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

                const res = await fetch(url)

                if (!res.ok) {

                    const errData =
                        await res.json().catch(() => ({}))

                    if (res.status === 401) {

                        throw new Error(
                            "Invalid API key"
                        )

                    }

                    const msg =
                        errData.message ||
                        `Weather lookup failed (${res.status})`

                    throw new Error(msg)
                }

                const data = await res.json()

                setWeather(data)

                updateLocalTime(data)

                setCity(data.name)

            } catch (err) {

                setError(err.message)

            } finally {

                setLoading(false)

            }
        }

    const useMyLocation = () => {

        if (!navigator.geolocation) {

            setError(
                "Geolocation is not supported by your browser"
            )

            return
        }

        navigator.geolocation.getCurrentPosition(

            (pos) => {

                const { latitude, longitude } =
                    pos.coords

                fetchWeatherByCoords(
                    latitude,
                    longitude
                )
            },

            () => {

                setError(
                    "Unable to retrieve your location"
                )

            },

            {
                timeout: 10000,
            }
        )
    }

    useEffect(() => {

        fetchWeather(null, "Delhi")

    }, [])

    const icon =
        weather?.weather?.[0]?.icon || ""

    const main =
        (
            weather?.weather?.[0]?.main || ""
        ).toLowerCase()

    const isDay = icon.endsWith("d")

    let theme = "theme-clouds"
    let emoji = "☁️"

    if (main.includes("clear")) {

        theme = isDay
            ? "theme-sunny"
            : "theme-night"

        emoji = isDay ? "☀️" : "🌙"

    } else if (
        main.includes("rain") ||
        main.includes("drizzle")
    ) {

        theme = "theme-rain"
        emoji = "🌧️"

    } else if (
        main.includes("snow")
    ) {

        theme = "theme-snow"
        emoji = "❄️"

    } else if (
        main.includes("cloud")
    ) {

        theme = "theme-clouds"
        emoji = "⛅"

    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900">
            <div className="w-full max-w-xl rounded-2xl p-6 card-3d">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold neon">
                            Weather Studio
                        </h1>

                        <p className="text-xs text-white/80">
                            Glass-style weather badges
                        </p>

                    </div>
                </div>
                <form
                    onSubmit={fetchWeather}
                    className="flex gap-2"
                >
                    <input
                        type="text"
                        value={city}
                        onChange={(e) =>
                            setCity(e.target.value)
                        }
                        placeholder="Enter city"
                        className="flex-1 p-3 rounded-lg bg-white/10 placeholder-white/60 text-white outline-none"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg shadow-md cursor-pointer"
                    >
                        Search
                    </button>
                </form>
                <button
                    type="button"
                    onClick={useMyLocation}
                    className="w-full mt-3 px-3 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg shadow-md cursor-pointer"
                >
                    Use My Location
                </button>
                {loading && (

                    <p className="mt-4 text-white/90">
                        Loading...
                    </p>

                )}
                {error && (

                    <p className="mt-4 text-red-400">
                        {error}
                    </p>

                )}
                {weather && (
                    <div
                        className={`mt-4 text-white ${theme}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="badge-main glass-badge">
                                <div className="badge-icon">
                                    {emoji}
                                </div>
                                <div>

                                    <div className="text-sm text-white/80 capitalize">
                                        {
                                            weather?.weather?.[0]
                                                ?.description
                                        }
                                    </div>
                                    <div className="badge-temp">
                                        {Math.round(
                                            weather?.main?.temp
                                        )}°C

                                    </div>
                                    <div className="text-xs text-white/70">

                                        {weather?.name},{" "}
                                        {weather?.sys?.country}

                                    </div>
                                    {localTimeStr && (

                                        <div className="text-xs text-white/60 mt-1">

                                            {localTimeStr}

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div className="p-3 rounded-lg glass-badge">
                                <div className="text-xs text-white/80">
                                    Feels Like
                                </div>
                                <div className="text-xl font-bold">
                                    {Math.round(
                                        weather?.main?.feels_like
                                    )}°C
                                </div>
                            </div>
                            <div className="p-3 rounded-lg glass-badge">
                                <div className="text-xs text-white/80">
                                    Humidity
                                </div>
                                <div className="text-lg font-semibold">

                                    {weather?.main?.humidity}%
                                </div>
                            </div>

                            <div className="p-3 rounded-lg glass-badge">
                                <div className="text-xs text-white/80">
                                    Wind
                                </div>
                                <div className="text-lg font-semibold">
                                    {weather?.wind?.speed
                                        ? (
                                            weather.wind.speed * 3.6
                                        ).toFixed(1)
                                        : "-"} km/h

                                </div>
                            </div>
                            <div className="p-3 rounded-lg glass-badge">
                                <div className="text-xs text-white/80">
                                    Pressure
                                </div>
                                <div className="text-lg font-semibold">
                                    {weather?.main?.pressure} hPa
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                 <p className="mt-4 text-xs text-gray-400">
                    Powered by <a href="https://indiaresultlive.com/" target="_blank">IndiaResultLive</a>
                </p> 
            </div>
        </div>
    )
}

export default Weather