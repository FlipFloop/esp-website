import React from "react"
import styled from "styled-components"
import SEO from "../components/seo"
import { REFERRAL_SOURCES, COUNTRIES } from "../utils/form-inputs"
import { PageBody } from "../components/SharedStyledComponents"
import { navigate } from "gatsby"
import * as styles from "../utils/styles"
// import horzLogo from "../images/horz-logo.svg"
// import vertLogo from "../images/vert-logo.svg"

const Header = styled.header`
  max-width: 548px;
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  padding: 2rem 4rem;
  border-radius: 4px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const Input = styled.input`
  margin-top: 8px;
  border: 2px solid #d1d1d1;
`
const TextArea = styled.textarea`
  margin-top: 8px;
  border: 2px solid #d1d1d1;
`

const Select = styled.select`
  margin-top: 8px;
  border: 2px solid #d1d1d1;
  background-color: ${styles.colorWhite};
`

const Button = styled.button`
  text-transform: uppercase;
  display: inline-block;
  vertical-align: middle;
  line-height: 1.5;
  text-align: center;
  border-radius: 20px;
  color: #ffffff;
  background: #e66981;
  border: 1px solid #e66981;
  font-size: 1.1rem;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  padding: 15px 30px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;

  &:hover {
    color: #ffffff;
    background: #d05d73;
  }
`

class ExplorePageV2 extends React.Component {
  state = {
    projectName: "",
    teamProfile: "",
    areaOfExpertise: "",
    whyEthereum: "",
    recentProjectsOrDevelopments: "",
    previousWork: "",
    questions: "",
    city: "",
    country: "",
    contactEmail: "",
    referralSource: "",
    referralName: "",
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.submitInquiry()
  }

  submitInquiry = () => {
    fetch("/.netlify/functions/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then(response => response.json())
      .then(result => {
        console.log("Inquiry Success:", { result })
        navigate("/thanks/")
      })
      .catch(error => {
        console.error("Inquiry Error:", error)
      })
  }

  render() {
    return (
      <>
        <SEO title="Explore Inquiry" />
        <PageBody>
          {/* <div className="image">
            <img
              className="horz-logo"
              src={horzLogo}
              alt="Ecosystem Support Program Horizontal Logo"
            />
            <img
              className="vert-logo"
              src={vertLogo}
              alt="Ecosystem Support Program Vertical Logo"
            />
          </div> */}
          <Header>
            <h1>Exploring possibilities</h1>
            <p>
              Tell us a bit about yourself, your skills, what you're excited
              about, and what questions you have. We only collect the following
              information submitted below and will not use or share for any
              purposes other than evaluation.
            </p>
          </Header>
          <Form onSubmit={this.handleSubmit}>
            <Label>
              Project name
              <Input
                type="text"
                name="projectName"
                value={this.state.projectName}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              Profile
              <div>
                <small>
                  Tell us a little bit about yourself - whatever you think we
                  should know.
                </small>
              </div>
              <TextArea
                name="teamProfile"
                value={this.state.teamProfile}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              Area of expertise
              <div>
                <small>
                  What is unique about your skill set? What kinds of problems do
                  you enjoy solving?
                </small>
              </div>
              <TextArea
                name="areaOfExpertise"
                value={this.state.areaOfExpertise}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              Why Ethereum?
              <TextArea
                name="whyEthereum"
                value={this.state.whyEthereum}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              What's a project or development that you were excited about
              recently?
              <TextArea
                name="recentProjectsOrDevelopments"
                value={this.state.recentProjectsOrDevelopments}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              Previous work
              <div>
                <small>
                  Please provide links to published code, research, or other
                  documentation of what you're working on.
                </small>
              </div>
              <TextArea
                name="previousWork"
                value={this.state.previousWork}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              What questions can we answer for you?
              <TextArea
                name="questions"
                value={this.state.questions}
                onChange={this.handleInputChange}
              />
            </Label>

            <Label>
              What country are you located in?
              <Select
                required
                defaultValue={"DEFAULT"}
                name="country"
                onChange={this.handleInputChange}
              >
                <option hidden disabled value="DEFAULT">
                  -- select an option --
                </option>
                {COUNTRIES.map((source, i) => {
                  return (
                    <option key={i} value={source}>
                      {source}
                    </option>
                  )
                })}
              </Select>
            </Label>

            <Label>
              What city are you located in?
              <Input
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              Contact email
              <Input
                type="email"
                name="contactEmail"
                value={this.state.contactEmail}
                onChange={this.handleInputChange}
              />
            </Label>
            <Label>
              How did you hear about Ecosystem Support?
              <Select
                required
                defaultValue={"DEFAULT"}
                name="referralSource"
                onChange={this.handleInputChange}
              >
                <option hidden disabled value="DEFAULT">
                  -- select an option --
                </option>
                {REFERRAL_SOURCES.map((source, i) => {
                  return (
                    <option key={i} value={source}>
                      {source}
                    </option>
                  )
                })}
              </Select>
            </Label>
            <Label>
              Did anyone recommend that you contact Ecosystem Support? If so,
              who?
              <Input
                type="text"
                name="referralName"
                value={this.state.referralName}
                onChange={this.handleInputChange}
              />
            </Label>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        </PageBody>
      </>
    )
  }
}

export default ExplorePageV2
