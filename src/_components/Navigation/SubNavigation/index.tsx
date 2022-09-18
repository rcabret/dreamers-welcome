import React from 'react'
import { useRouter } from 'next/router'
import BodyText from '../../Typography/BodyText'
import { SubLink, SubNav } from '../../../styles/navigation/styles'

const SubNavigation = ({
    data,
    queryArray,
    activeState,
    queryParam,
}: {
    data: { name: string; slug: string }[]
    queryArray?: string | string[]
    activeState?: string
    queryParam?: string
}) => {
    const router = useRouter()
    const shallowRoute = (slug: string): void => {
        if (queryArray === undefined) {
            return
        }

        const baseUrl = `/${queryArray[0]}`
        const anchor = document.getElementById('anchor_view')
        if (anchor) {
            setTimeout(function () {
                window.scrollTo({
                    behavior: 'smooth',
                    top: anchor.offsetTop - 100,
                })
            }, 100)
        }
        const pre = queryParam ? `?${queryParam}=` : '/'

        router.push(`${baseUrl}${pre}${slug}`, undefined, { shallow: true })
    }

    const getSubClass = (slug: string): string => {
        if (queryArray === undefined) {
            return ''
        }
        return slug === activeState ? 'active' : ''
    }
    return (
        <SubNav>
            <div>
                {data &&
                    data.length &&
                    data.map((x, i: number) => {
                        return (
                            <SubLink
                                key={i * Math.random()}
                                onClick={() => shallowRoute(x.slug)}
                            >
                                <BodyText
                                    size="lg"
                                    uppercase
                                    className={getSubClass(x.slug)}
                                >
                                    {x.name}
                                </BodyText>
                            </SubLink>
                        )
                    })}
            </div>
            <div className="separator" />
        </SubNav>
    )
}

export default SubNavigation
