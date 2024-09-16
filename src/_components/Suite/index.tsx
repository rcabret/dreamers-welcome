import React, { useContext } from 'react'
import Highlight from './Highlight'
import Block from '../UI/Block'
import { BlockListWrap, GridModule } from '../../styles/global'
import Header from '../Typography/Header'
import MarkdownModule from '../Typography/MarkdownModule'
import { ConceptTextContainer } from '../../styles/about/styles'
import CollapsableList from '../UI/CollapsableList'
import { viewportContext } from '../../_utils/ViewportProvider'
import { useState } from 'react'
import Modal from './modal'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'

interface SuiteProps {
    data: {
        fields: {
            highlights: []
            features: []
            description?: string
        }
    }
    propertySlug: string
    hideFirstSeparator?: boolean
}




const Suite = ({ data, hideFirstSeparator, propertySlug = '' }: SuiteProps) => {
    if (data && !data.fields) {
        return null
    }

    const { fields } = data
    console.log("fields -----", fields)
    const { highlights = [], features = [], description } = fields

    const breakpoint = useContext(viewportContext)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    // Ensure highlights is an array before calling .filter
    const filteredHighlights = Array.isArray(highlights) ? highlights.filter(
        (highlight: { fields: { highlightName: string } }) =>
            highlight?.fields?.highlightName !== 'Floorplan'
    ) : []

    const floorplanHighlight = Array.isArray(highlights) ? highlights.filter(
        (highlight: { fields: { highlightName: string } }) =>
            highlight?.fields?.highlightName === 'Floorplan'
    ) : []

    // Default message if no floorplan highlight is found
    const floorplanMessage = floorplanHighlight.length === 0 ? "" : null

    return (
        <>
            <div className="overview_wrapper">
                {description ? (
                    <>
                        <Block
                            hideSeparator
                            title="OVERVIEW"
                            content={<MarkdownModule data={description} />}
                        />
                        {floorplanHighlight.length > 0 ? (
                            <button className="cmn_btn floor_plan" onClick={openModal}>
                                Floorplan
                            </button>
                        ) : (
                            <p>{floorplanMessage}</p>
                        )}
                    </>
                ) : (
                    floorplanHighlight.length > 0 ? (
                        <button className="cmn_btn floor_plan" onClick={openModal}>
                            Floorplan
                        </button>
                    ) : (
                        <p>{floorplanMessage}</p>
                    )
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="FLOORPLAN">
                <div className='floor_images_carousal'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {floorplanHighlight.length > 0 ? (
                            floorplanHighlight.map((element: string, index) => 
                                element?.fields?.images.map(
                                    (images: string, imgIndex) => (
                                        <SwiperSlide key={index + '-' + imgIndex}>
                                            <img
                                                src={images.fields.file.url}
                                                alt={images.fields.description}
                                            />
                                        </SwiperSlide>
                                    )
                                )
                            )
                        ) : (
                            <p>{floorplanMessage}</p>
                        )}
                    </Swiper>
                </div>
            </Modal>

            {filteredHighlights && filteredHighlights.length > 0
                ? filteredHighlights.map((x: { fields: any }, i: number) => {
                      const { highlightName, blurb, images, slug } = x.fields
                      return (
                          <Highlight
                              key={`${slug}-${Math.random() * i}`}
                              slug={propertySlug}
                              title={highlightName}
                              blurb={blurb}
                              images={images}
                              hideSeparator={
                                  hideFirstSeparator && i === 0 && !description
                              }
                          />
                      )
                  })
                : null}
                
            {features && (
                <Block
                    title="FEATURES"
                    noPaddingBottom
                    sideScrollOnMobile={false}
                    content={
                        breakpoint !== 'mobile' ? (
                            <GridModule
                                columns={features.length}
                                sideScrollOnMobile={false}
                            >
                                {features.map((feature: any) => (
                                    <BlockListWrap
                                        key={feature.fields.title}
                                    >
                                        <Header size={4}>
                                            {feature.fields.title}
                                        </Header>
                                        <MarkdownModule
                                            data={feature.fields.text}
                                        />
                                    </BlockListWrap>
                                ))}
                            </GridModule>
                        ) : (
                            <CollapsableList data={features} />
                        )
                    }
                />
            )}
        </>
    )
}

export default Suite

