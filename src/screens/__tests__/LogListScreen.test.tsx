import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import LogListScreen from "../LogListScreen";

const mockStore = configureStore([]);

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

describe("LogListScreen", () => {
  const mockNavigation = { navigate: jest.fn() };
  const mockedUseTranslation = useTranslation as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseTranslation.mockReturnValue({
      t: (key: string) => key,
      i18n: { language: "en", changeLanguage: jest.fn() },
    });
  });

  it("covers all branches including syncStatus colors and language toggle", () => {
    const store = mockStore({
      logs: {
        logs: [
          {
            id: "1",
            activityName: "A",
            date: "D",
            status: "Pending",
            syncStatus: "pending",
          },
          {
            id: "2",
            activityName: "B",
            date: "D",
            status: "Completed",
            syncStatus: "synced",
          },
        ],
      },
    });

    const { getByText, rerender } = render(
      <Provider store={store}>
        <LogListScreen navigation={mockNavigation} />
      </Provider>,
    );

    expect(getByText("PENDING")).toBeTruthy();
    expect(getByText("SYNCED")).toBeTruthy();

    const langBtnEn = getByText("EN");
    fireEvent.press(langBtnEn);

    mockedUseTranslation.mockReturnValue({
      t: (key: string) => key,
      i18n: { language: "vi", changeLanguage: jest.fn() },
    });

    rerender(
      <Provider store={store}>
        <LogListScreen navigation={mockNavigation} />
      </Provider>,
    );

    const langBtnVi = getByText("VI");
    fireEvent.press(langBtnVi);
  });

  it("navigates correctly and renders empty list", () => {
    const store = mockStore({ logs: { logs: [] } });
    const { getByText } = render(
      <Provider store={store}>
        <LogListScreen navigation={mockNavigation} />
      </Provider>,
    );

    expect(getByText("log.empty")).toBeTruthy();
    fireEvent.press(getByText("+"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith("AddEditLog");
  });
});
