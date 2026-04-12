import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Alert, TextInput } from "react-native";
import { Provider } from "react-redux";
import { store } from "../../store";
import AddEditLogScreen from "../AddEditLogScreen";

jest.mock("uuid", () => ({
  v4: () => "mock-uuid-123",
}));

const mockNavigation = {
  goBack: jest.fn(),
};

const mockDispatch = jest.fn();
jest.mock("react-redux", () => {
  const actual = jest.requireActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("AddEditLogScreen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields correctly", () => {
    const { getByPlaceholderText, getByText } = renderWithProviders(
      <AddEditLogScreen navigation={mockNavigation} />,
    );

    expect(getByPlaceholderText("e.g. Harvesting")).toBeTruthy();
    expect(getByText("common.save")).toBeTruthy();
  });

  it("should not dispatch action if activity name is empty", () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});

    const { getByText } = renderWithProviders(
      <AddEditLogScreen navigation={mockNavigation} />,
    );

    const saveButton = getByText("common.save");
    fireEvent.press(saveButton);

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith("error.required");

    alertSpy.mockRestore();
  });

  it("dispatches addLogRequest with ALL fields (Name, Status, Notes) to cover 100% logic", () => {
    const { getByPlaceholderText, getByText, UNSAFE_getAllByType } =
      renderWithProviders(<AddEditLogScreen navigation={mockNavigation} />);

    const nameInput = getByPlaceholderText("e.g. Harvesting");
    fireEvent.changeText(nameInput, "Bón phân");

    const allInputs = UNSAFE_getAllByType(TextInput);
    const notesInput = allInputs[1];
    fireEvent.changeText(notesInput, "Bón phân NPK đợt 1");

    const completedBtn = getByText("status.completed");
    fireEvent.press(completedBtn);

    const saveButton = getByText("common.save");
    fireEvent.press(saveButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "logs/addLogRequest",
      payload: expect.objectContaining({
        id: "mock-uuid-123",
        activityName: "Bón phân",
        notes: "Bón phân NPK đợt 1",
        status: "Completed",
        syncStatus: "pending",
      }),
    });

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
