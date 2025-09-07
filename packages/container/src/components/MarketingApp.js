import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  let ref = useRef(null);
  let history = useHistory();
  // this history object will give us the ability to change container's browser history path

  useEffect(() => {
    let { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate(location) {
        // the location parameter will give us the object
        // that will give us path of the remote app i.e. marketing app
        let { pathname: newPathName } = location;
        let pathname = history.location;

        if (pathname !== newPathName) {
          history.push(newPathName);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
