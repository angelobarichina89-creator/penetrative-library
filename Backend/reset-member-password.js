const RESET_ENDPOINT = '/api/members/password-reset';

/** Request a reset link; the server must verify the member and issue an expiring, single-use token. */
async function resetMemberPassword(email) {
	if (typeof email !== 'string' || !email.trim()) {
		throw new TypeError('A valid email address is required.');
	}

	const response = await fetch(RESET_ENDPOINT, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
		body: JSON.stringify({ email: email.trim() }),
	});

	if (!response.ok) {
		throw new Error('Password reset request failed.');
	}

	return 'If an account matches that email, reset instructions will be sent.';
}

if (typeof module !== 'undefined') {
	module.exports = { resetMemberPassword };
}
