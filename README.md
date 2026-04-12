# Farming Log Mini-App (Offline-first)

A robust React Native application built with Expo, focused on offline-first data management and synchronized state.

## 🚀 Tech Stack
- **Framework**: Expo (React Native) + TypeScript (Strict Mode).
- **State Management**: Redux Toolkit & Redux-Saga (handling complex async logic).
- **Persistence**: Redux-Persist with AsyncStorage.
- **Localization**: i18next (supports English & Vietnamese).
- **Testing**: Jest & React Native Testing Library (100% Screen Coverage).

## 🏗️ Architectural Decisions
- **Offline-first**: All user actions are saved immediately to the local store (Persisted). A background Saga worker monitors the `syncStatus` and simulates a network sync to the server.
- **Saga vs Thunk**: Redux-Saga was chosen to handle the "Sync" flow because it allows for non-blocking calls, easy cancellation, and better management of complex side-effects like "retry logic".
- **Atomic Folder Structure**: Code is organized into `screens`, `store`, `components`, and `i18n` for high maintainability.

## 🧪 Testing Strategy
- **Unit Testing**: Focuses on the core business logic in `store` and UI rendering in `screens`.
- **Coverage**: Achieved **100% Coverage** for all Screen components, ensuring all UI states (empty, loading, success) and language toggles are verified.
- **Command**: Run `npm test` to see the full coverage report.

## 📈 Future Improvements
- **Exponential Backoff**: Implement a more sophisticated retry strategy for synchronization.
- **Conflict Resolution**: Logic to handle data versioning between Client and Server.
- **Database**: Transition from AsyncStorage to **Expo SQLite** for large-scale data handling.