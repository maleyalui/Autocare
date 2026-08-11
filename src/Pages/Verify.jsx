import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import API from '../auth/api'

function Verify() {
    const navigate = useNavigate()
    const location = useLocation()

    //Email passed from register page
    const email = location.state?.email || ''

    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    //Handle each digit input
    const handleChange = (value, index) => {
        if(!/^\d*$/.test(value)) return // only numbers
        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        // Auto move to next input
        if (value && index < 5) {
            document.getElementById(`code-${index + 1}`).focus()
        }
    }

    //Handle backspace
    const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus()
    }
    }

    const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const fullCode = code.join('')
    if (fullCode.length < 6) {
      setError('Please enter all 6 digits')
      return
        }
    }

    setLoading(true)
    try {
        await API.post('/auth/verify', { email, code: fullCode })
        setSuccess(true)
        setTimeout(()=> navigate('/login'), 2000)
    } catch (err) {
        setError(err.response?.data?.error || 'Invalid code')
    } finally {
        setLoading(false)
    }


    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white p-10 rounded-2xl shadow-sm w-full max=w=md text-center">

                <div className="text-5xl mb-4"> </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Verify Your Account</h2>
                <p className="text-gray-400 text-sm mb-2">
                    We sent a 6-digit code to your email and phone
                </p>
                {email && (
                     <p className="text-orange-500 text-sm font-medium mb-6">{email}</p>
                )}

                {success ? (
          <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm font-medium">
             Account verified! Redirecting to login...
          </div>
            ) : (
          <form onSubmit={handleSubmit}>

            {/* 6 digit code inputs */}
            <div className="flex justify-center gap-3 mb-6">
              {code.map((digit, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(e.target.value, i)}
                  onKeyDown={e => handleKeyDown(e, i)}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl outline-none focus:border-orange-400 transition"
                />
              ))}
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition disabled:bg-gray-300"
            >
              {loading ? 'Verifying...' : 'Verify Account'}
            </button>

            <p className="text-gray-400 text-xs mt-4">
              Didn't get the code? Check your spam folder or register again.
            </p>

          </form>
            )}
        </div>
    </div>
    )
}

export default Verify