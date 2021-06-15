import React from "react";
import { render, screen, wait, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "../Display";
import fetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow");

const showTest = {
    //add in approprate test data structure here.
    name: "Stranger Things",
    summary: "summary",
    seasons: [
      {
        name: "Season 1",
        id: 1,
        episodes: [{ id: 1, number: 10 }],
      },
    ],
  };
  
  test("Test that the Display component renders without any passed in props", () => {
    render(<Display />);
  });

  test("Test that when the fetch button is pressed,the show component will display", async () => {
    render(<Display />);
    fetchShow.mockResolvedValueOnce(showTest);
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
    const showContainer = screen.queryByTestId("show-container");
    expect(showContainer).toBeInTheDocument();
  });
});
test("Test that when the fetch button is pressed, select options rendered is equal to the amount of seasons", async () => {
    render (<Display />)
    fetchShow.mockResolvedValueOnce(showTest);
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() =>{
      const seasonOption = screen.getAllByTestId("season-option");
      console.log("seasonOption:",seasonOption.length);
      expect(seasonOption).toHaveLength(1);
    });
  });
  test("Test that when the fetch button is pressed, displayFunc is called", async() => {
    const fakeDisplayFunc = jest.fn();
    render (<Display displayFunc={fakeDisplayFunc}/>)
    fetchShow.mockResolvedValueOnce(showTest)
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() =>{
      expect(fakeDisplayFunc).toBeCalledTimes(1);
    });
  });












///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.