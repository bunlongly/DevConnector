import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Correct import for useNavigate
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience }) => {
  const navigate = useNavigate();  // useNavigate should be called directly, not passed as a prop
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,  // should be boolean not string 'false'
    description: ''
  });

  const [toDataDisabled, toggleDisabled] = useState(true); // Default should reflect initial logic; possibly true if current is initially false

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = e => {
    const isCurrent = e.target.checked;
    setFormData({ ...formData, current: isCurrent });
    toggleDisabled(!toDataDisabled); // Disable 'to' date input if 'current' is checked
  };

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Add An Experience</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form
          className='form'
          onSubmit={e => {
            e.preventDefault();
            addExperience(formData, navigate);
          }}
        >
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Job Title'
              name='title'
              value={title}
              required
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Company'
              name='company'
              value={company}
              required
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input
              type='date'
              name='from'
              value={from}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <p>
              <input
                type='checkbox'
                name='current'
                checked={current}
                onChange={handleCheckboxChange}
              /> Current Job
            </p>
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input
              type='date'
              name='to'
              value={to}
              onChange={onChange}
              disabled={!toDataDisabled}
            />
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              placeholder='Job Description'
              value={description}
              onChange={onChange}
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>Go Back</Link>
        </form>
      </section>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(AddExperience);
