import React from "react";

import { render, waitForElement, fireEvent } from "@testing-library/react";

import Appointment from "components/Appointment/index"
import Application from "components/Application"

// afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});