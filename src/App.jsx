// App.jsx
import ScriptEditor from './components/ScriptEditor';
import ControlsPanel from './components/ControlsPanel';
import PrompterScreen from './components/PrompterScreen';
import ScreenRecorder from './components/ScreenRecorder';
import ThemeToggle from './components/ThemeToggle';
import ScreenRecorderWithPrompt from './components/ScreenRecorderWithPrompt';
import ResetButton from './components/ResetButton';

function App() {
  return (
    <div className="h-screen w-full overflow-auto bg-gradient-to-br from-slate-900 via-blue-950 to-gray-900 text-white font-sans">
      <header className="bg-black/70 text-white py-4 border-b border-white/10 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">🎤 TelePromptify Pro</h1>
            <p className="text-sm text-gray-300">Your all-in-one teleprompter & recorder</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg transition-all">
              <ScriptEditor />
              <ControlsPanel />
              <ResetButton />
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg transition-all max-h-[calc(100vh-200px)] overflow-y-auto">
              <ScreenRecorder />
              <ScreenRecorderWithPrompt />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg transition-all max-h-[calc(100vh-200px)] overflow-y-auto">
            <PrompterScreen />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
