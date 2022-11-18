import React, { useState, useEffect } from "react";
import { Field, ErrorMessage } from "formik";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  // Dropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
} from "reactstrap";
import fbLogo from "../../assets/images/links/Facebook-Logo.png";
import igLogo from "../../assets/images/links/Instagram-Logo.jpg";
import liLogo from "../../assets/images/links/Linkedin-Logo.png";
import twLogo from "../../assets/images/links/Twitter-Logo.png";
import ytLogo from "../../assets/images/links/Youtube-Logo.png";

function ExternalLink({ externalLink }) {
  const _logger = debug.extend("ExternalLink");
  const externalLinkObj = externalLink;
  _logger("From ExternalLink Comp", externalLinkObj.urlType.id);

  const [urlType] = useState([
    { id: 1, name: "Facebook", image: fbLogo },
    { id: 2, name: "Instagram", image: igLogo },
    { id: 3, name: "LinkedIn", image: liLogo },
    { id: 4, name: "Twitter", image: twLogo },
    { id: 5, name: "Youtube", image: ytLogo },
  ]);

  const [mappedUrlOptions, setMappedUrlOptions] = useState({
    image: [],
    mapOfComp: [],
  });

  useEffect(() => {
    mappedUrl();
  }, []);

  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const toggle = () => setDropdownOpen((prevState) => !prevState);

  const mappedUrl = () => {
    // const test = [];
    // ps.image = urlType.map(mapImage);
    // ps.mapOfComp = urlType.map(mapUrlType);

    setMappedUrlOptions((prevState) => {
      let ps = { ...prevState };
      ps.image = urlType.map(mapImage);
      ps.mapOfComp = urlType.map(mapUrlType);
      return ps;
    });
  };

  const mapImage = (img) => {
    return (
      <img
        src={img.image}
        alt="Social Profile Logo"
        className="externalLinksFbLogo"
      />
    );
  };

  const mapUrlType = (urlType) => {
    // if (externalLinkObj.urlType.id === urlType.id) {
    //   return;
    // }

    return (
      <React.Fragment>
        <option value={urlType.id} key={`externalLink_${urlType.id}`}>
          {urlType.name}
        </option>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Row className="mb-5">
        <Col lg={1} md={4} sm={12}>
          {/* <img
            src={mappedUrlOptions.image}
            alt="Social Profile Logo"
            className="externalLinksFbLogo"
          /> */}

          {mappedUrlOptions.image}
        </Col>
        <Col lg={2}>
          <Field
            component="select"
            name="urlTypeDropDown"
            className="form-control"
          >
            <option value="">Select Profile</option>
            {mappedUrlOptions.mapOfComp}
          </Field>
          {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="primary" caret>
              Link
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Social Profile</DropdownItem>
              <DropdownItem>Facebook</DropdownItem>
              <DropdownItem>Instagram</DropdownItem>
              <DropdownItem>LinkedIn</DropdownItem>
              <DropdownItem>Twitter</DropdownItem>
              <DropdownItem>YouTube</DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
        </Col>
        <Col lg={7} md={8} sm={12}>
          <Field
            type="text"
            className="text-muted form-control mb-1"
            placeholder={externalLinkObj.url}
            name={externalLinkObj.urlType.name}
            // id="facebookText"
          />
          <ErrorMessage
            name={externalLinkObj.urlType.name}
            component="div"
            className="has-error"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

ExternalLink.propTypes = {
  externalLink: PropTypes.shape({
    props: PropTypes.shape({
      externalLink: PropTypes.shape({
        entityId: PropTypes.number.isRequired,
        entityType: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }),
        url: PropTypes.string.isRequired,
        urlType: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }),
      }),
    }),
  }),
};

export default ExternalLink;
