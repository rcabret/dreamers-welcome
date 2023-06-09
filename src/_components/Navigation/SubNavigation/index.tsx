import React from 'react'
import { useRouter } from 'next/router'
import { SubLink, SubNav } from '../../../styles/navigation/styles'

const SubNavigation = ({
    data,
    queryArray,
    activeSlug,
    queryParam,
}: {
    data: { name: string; slug: string }[]
    queryArray: string | string[]
    activeSlug?: string
    queryParam?: string
}) => {
    const router = useRouter()
    const baseUrl = queryArray && Array.isArray(queryArray) ? queryArray.join('/'): queryArray

    const shallowRoute = (slug: string): void => {
        if (queryArray === undefined) {
            return
        }
        const anchor = document.getElementById('anchor_view')
        if (anchor) {
            setTimeout(function () {
                window.scrollTo({
                    behavior: 'smooth',
                    top: anchor.offsetTop - 100,
                })
            }, 100)
        }

        const tail = queryParam ? `?${queryParam}=${slug}` : `/${slug}`
        if (slug !== activeSlug) {
            router.push(`${baseUrl}${tail}`, undefined, { shallow: true })
        }
    }

    const getSubClass = (slug: string): string => {
        if (queryArray === undefined) {
            return ''
        }
        return slug === activeSlug ? 'active' : ''
    }
    return (
        <SubNav>
            <div>
                {data &&
                    data.length &&
                    data.map((x, i: number) => {
                        return (
                            <SubLink
                                title={x.name}
                                key={i * Math.random()}
                                onClick={() => shallowRoute(x.slug)}
                                className={getSubClass(x.slug)}
                            >
                                {x.name}
                            </SubLink>
                        )
                    })}
            </div>
        </SubNav>
    )
}

export default SubNavigation
