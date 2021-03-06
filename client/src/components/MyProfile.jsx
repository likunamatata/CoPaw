import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { readOneProfile } from '../services/user-helper'
import { twitter_svg, linkedin_svg, ig_svg } from '../services/svg'
import CreateInterest from './CreateInterest'
import Timer from './Timer';
import TimeZone from './TimeZone';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: '',
      defaultMessage: ''
    }

  }

  async componentDidMount() {
    const response = await readOneProfile(this.props.currentUser.id)
    if (response.length > 0) {
      this.setState({
        profileData: response[0]
      })
    }
    else {
      this.setState({
        defaultMessage: 'Please edit your profile'
      })
    }
  }


  render() {
    const { profileData, defaultMessage } = this.state
    return (
      <div className='subComments-display'>
        <CreateInterest profile_id={profileData.id}/>
        <Link to='/edit-profile'>
          <button>Edit</button>
        </Link>
        <p>{defaultMessage}</p>
        <div className='profile-section'>
        {/* eslint-disable-next-line */}
          <img src={profileData.img_url} />
          <h1>{profileData.full_name}</h1>
          <p>{profileData.title} | {profileData.department}</p>
          <Timer />
          <TimeZone />
        </div>

        <div className='profile-section'>
          <p>Interests and Hobbies</p>
        </div>

        <div className='profile-section'>
          <p>What's Up</p>
          <p>{profileData.status}</p>
        </div>

        <div className='profile-section'>
          <p>Social Links</p>
          {!profileData.twitter_url ? '' : <a href={profileData.twitter_url}>{twitter_svg}</a>}
          {!profileData.linkedin_url ? '' : <a href={profileData.linkedin_url}>{linkedin_svg}</a>}
          {!profileData.ig_url ? '' : <a href={profileData.ig_url}>{ig_svg}</a>}
        </div>

        <div className='profile-section'>
          <p>Reach Out</p>
          <p>{profileData.mobile}</p>
          <p>{profileData.landline}</p>
          <p>{profileData.personal_email}</p>
          <p>{profileData.website_url}</p>
          <p>{profileData.office}</p>
          <p>{profileData.business_address}</p>
        </div>

      </div>
    )

  }

}


export default MyProfile