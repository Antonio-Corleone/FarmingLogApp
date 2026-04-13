# 📝 Farming Log Mini-App (Offline-first)

A high-performance React Native application built with **Expo**, focusing on robust offline-first data management, synchronized state, and high-quality code standards.

## 🚀 Tech Stack
- **Framework**: Expo (React Native) + **TypeScript (Strict Mode)**.
- **State Management**: **Redux Toolkit** & **Redux-Saga** (Powering complex async synchronization).
- **Persistence**: **Redux-Persist** with AsyncStorage for seamless session recovery.
- **Connectivity**: `@react-native-community/netinfo` with custom Redux-Saga Event Channels.
- **Testing**: **Jest** & **React Native Testing Library** (Focusing on nearly 100% logic coverage).
- **Localization**: **i18next** (Supports English & Vietnamese).

## 🏗️ Architectural Decisions

### 🔄 Offline-first Synchronization Flow
The application ensures that data is never lost, regardless of network conditions. We use an **Optimistic UI** approach combined with a background synchronization worker.

1. **User Action**: Data is saved immediately to the local store with `syncStatus: 'pending'`.
2. **Persistence**: `Redux-Persist` ensures data survives app restarts or crashes.
3. **Connectivity Listener**: A Saga `eventChannel` monitors network changes in real-time.
4. **Background Sync**: Upon reconnecting, the Saga worker automatically scans for `pending/failed` logs and synchronizes them using non-blocking `fork` effects.

### 🧠 Why Redux-Saga?
While Thunks are simpler, **Redux-Saga** was chosen for this project to handle complex side-effects:
- **Non-blocking Execution**: Syncing multiple logs concurrently without freezing the UI.
- **Event Channels**: Elegant handling of external events like network status changes.
- **High Testability**: Generator functions allow us to test complex async flows step-by-step without mocking timers or complex promises.

## 🧪 Testing Strategy & Quality Assurance
This project emphasizes reliability through a rigorous testing process:

- **Screen Testing**: Verified all UI states (Empty, Loading, Success) and user interactions (Form validation, Navigation).
- **Saga Unit Testing**: Achieved high coverage by testing every branch of the generator functions:
    - **Online Success Path**: Verifies data is sent and status updated to `synced`.
    - **Offline Path**: Verifies data remains `pending` and no API call is made.
    - **Error Handling**: Verifies that exceptions are caught and status marked as `failed`.
- **Coverage Summary**:
    - **Screens**: 100%
    - **Redux Slices**: 100%
    - **Sagas**: >80% (Covering all critical sync logic).

> **Command**: Run `npm run test:coverage` to verify the report.

## 📂 Atomic Folder Structure
```text
src/
 ├── components/    # Reusable UI atoms (Buttons, Inputs, Cards)
 ├── i18n/          # Localization configurations (EN/VI)
 ├── screens/       # Main screen components & Screen-level tests
 ├── store/         
 │    ├── slices/   # Redux logic (Reducers & Action Creators)
 │    └── sagas/    # Complex side-effects & Background sync logic
 ├── types/         # Centralized TypeScript interfaces
 └── utils/         # Helper functions
```
## 📈 Future Improvements
- **Exponential Backoff**: Implement a more sophisticated retry strategy for synchronization.
- **Conflict Resolution**: Logic to handle data versioning between Client and Server.
- **Database**: Transition from AsyncStorage to **Expo SQLite** for large-scale data handling.