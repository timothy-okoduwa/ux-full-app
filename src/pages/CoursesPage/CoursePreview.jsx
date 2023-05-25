import React from 'react'
import CourseCard from '../../components/CourseCard'
import CourseDescriptionAndContent from '../../components/CourseDescriptionAndContent'
import CourseRequirement from '../../components/CourseRequirement'
import DesignToFit from '../../components/DesignToFit'
import RecommendedCourse from '../../components/RecomendedCourse'

const CoursePreview = () => {
  return (
    <div className='cpcp'>
        <CourseCard/>
        <CourseDescriptionAndContent/>
        <CourseRequirement/>
     <DesignToFit/>
     <RecommendedCourse/>
    </div>
  )
}

export default CoursePreview