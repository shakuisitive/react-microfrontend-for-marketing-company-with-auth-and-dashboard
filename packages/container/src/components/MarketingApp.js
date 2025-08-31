import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  let ref = useRef(null);
  let history = useHistory();

  useEffect(() => {
    let { onParentNavigate } = mount(ref.current, {
      onNavigate({ pathname: nextPathName }) {
        let { pathname } = history.location;

        if (pathname !== nextPathName) {
          history.push(nextPathName);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
