import React from 'react'

const CurriculumForm = () => {

  const level = 'beginner'
  const topic = 'software engineering'
  const duration = '4 months'

  const prompt = `
    Generate a comprehensive learning roadmap for a ${level} student learning ${topic}. 
    The curriculum should span ${duration} weeks, including theory modules and practical labs.
    Each day should cover one specific task with hands-on exercises.
  `;

  return (
    <div>
      Curriculum Form...
    </div>
  )
}

export default CurriculumForm;
