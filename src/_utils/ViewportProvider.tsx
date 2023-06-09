import React, { ReactNode, useEffect, useState } from 'react'
// @ts-ignore
const viewportContext = React.createContext<string>()

const ViewportProvider = ({ children }: { children: ReactNode }) => {
    const whatBreakpoint = (e?: Event) => {
        const width = window.innerWidth
        let bp
        if (width > 960) {
            bp = 'desktop'
        } else if (width <= 960 && width > 640) {
            bp = 'tablet'
        } else {
            bp = 'mobile'
        }
        setBreakpoint(bp)
    }
    const [breakpoint, setBreakpoint] = useState('')

    useEffect(() => {
        whatBreakpoint()
        window.addEventListener('resize', whatBreakpoint)
        return () => window.removeEventListener('resize', whatBreakpoint)
    }, [])

    return (
        <viewportContext.Provider value={breakpoint}> {children} </viewportContext.Provider>
    )
}

export { ViewportProvider, viewportContext }
