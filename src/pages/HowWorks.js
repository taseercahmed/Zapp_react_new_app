import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function HowWorks() {
  var navigate=useNavigate()

  function handleclick(){
    navigate('/')
  }
  return (
    <div className="mainhowwork col-lg-12">
      <div>
        <h3 className="howitworktxt"> How it Work</h3>
        <hr className="hrstyle"></hr>
      </div>
      <div className="rowdiv  ">
        <div className="columndiv col-lg-4 col-md-6 col-sm-12">
          <svg className="how-step-image" viewBox="0 0 67.74 118.92"><rect fill="none" height="116.92" rx="3.67" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="65.74" x="1" y="1" /><circle cx="33.87" cy="107.7" fill="#c32a2e" r="3.6" /><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="m27.5 11.21h12.73" /><path d="m1 21.42h65.74" /><path d="m66.74 97.49h-65.74" /><path d="m43.06 45.54-18.35 23.66" /><path d="m27.94 50.72h13.28l2.91 13.28h-20.8c0-3.13 2.48-6.82 8.52-6.82h10.5" /><circle cx="33.87" cy="57.38" r="23.08" /></g></svg>
          <h2 className="how-step-number">1.</h2>
          <p className="para">
            Choose <strong>when</strong> and <strong>where</strong> you wish us to collect & deliver your laundry.
          </p>
        </div>

        <div className="columndiv col-lg-4 col-md-6 col-sm-12">
          <svg className="how-step-image" viewBox="0 0 180.2 89.79"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><g stroke="#000"><path d="m168.5 40.2c-4.05-1.2-20.5-5.54-24.59-6.68-7.37-2.06-7.94-2-10.58-4.88-7.16-7.82-9.61-10.58-18.72-19.7-4.15-4.15-13-7.94-23-7.94h-78.21c-2.94 0-4.49 2.22-5.32 5.34l-6.89 32.15a8.49 8.49 0 0 0 -.19 1.74v25.16a8.79 8.79 0 0 0 8.79 8.79h.21v-1.89c0-10.17 8.83-18.42 19.72-18.42s19.73 8.25 19.73 18.42v1.89h77.14v-1.89c0-10.17 8.83-18.42 19.72-18.42s19.72 8.25 19.72 18.42v1.89h3.58c7 0 9.53-3.7 9.53-9.4v-12.86c.06-7-2.67-9.44-10.64-11.72z" /><path d="m91.66 8.75h-5v17.81.22a8.92 8.92 0 0 0 8.61 7.22l29.8.07a1.21 1.21 0 0 0 .86-2.06c-.2-.21-.37-.38-.44-.47-5.55-6.05-8.33-9.1-16.37-17.13-2.74-2.74-9.8-5.66-17.46-5.66z" /><ellipse cx="29.75" cy="74.26" rx="14.24" ry="14.53" /><ellipse cx="29.75" cy="74.26" rx="5.27" ry="5.37" /><ellipse cx="146.37" cy="74.26" rx="14.24" ry="14.53" /><ellipse cx="146.37" cy="74.26" rx="5.27" ry="5.37" /><path d="m1 57.77h16.57" /><path d="m158.47 57.77h20.73" /><path d="m178.8 48h-8.53a4.74 4.74 0 0 0 -4.48 3.19l-2.26 6.57" /></g><path d="m5.16 40.37v13.67" stroke="#c32a2e" /><path d="m84.94 44.31h10.42" stroke="#000" /></g></svg>
          <h2 className="how-step-number">2.</h2>

          <p className="para">
            We <strong>collect</strong> your bag, <strong>list</strong> and <strong>clean</strong> your items according to <strong>your requirements</strong>.
          </p>
        </div>

        <div className="columndiv col-lg-4 col-md-6 col-sm-12">
          <svg className="how-step-image" viewBox="0 0 92.68 118.91"><path d="m26.14 48.59a2.25 2.25 0 0 0 -1.94 1.17 2.25 2.25 0 0 0 -1.94-1.17 2.37 2.37 0 0 0 -2.26 2.41 2.61 2.61 0 0 0 .45 1.47 18.14 18.14 0 0 0 2.07 2.14l1.69 1.59 2-1.88a16 16 0 0 0 1.79-1.81 2.53 2.53 0 0 0 .41-1.51 2.36 2.36 0 0 0 -2.27-2.41z" fill="#c32a2e" /><circle cx="54.49" cy="40.54" fill="#000" r="1.93" /><circle cx="54.49" cy="71.69" fill="#000" r="1.93" /><circle cx="54.49" cy="102.83" fill="#000" r="1.93" /><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="m21.3 17.17h-16.63a3.68 3.68 0 0 0 -3.67 3.66v93.41a3.68 3.68 0 0 0 3.67 3.67h83.33a3.68 3.68 0 0 0 3.67-3.67v-93.41a3.68 3.68 0 0 0 -3.67-3.66h-14.61" /><path d="m47.4 15.11v102.8" /><path d="m29.45 1-8 16.06 12.81 17.27 13.13-19.22s-18.17-5.37-17.94-14.11z" /><path d="m65.34 1 8 16.06-12.81 17.27-13.13-19.22s18.17-5.37 17.94-14.11z" /><path d="m29.45 1h35.89" /></g></svg>
          <h2 className="how-step-number">3.</h2>
          <p className="para">
            We <strong>deliver</strong> your items cleaned within <strong>24 hours</strong> and at the time required.
          </p>
        </div>
      </div>
      <a href='/'><Button color='primary' variant='outlined' onClick={handleclick}>Order Now</Button></a>

    </div>
  )
}
