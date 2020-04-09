/// A simple logger class used to print messages.
class Logger {
	/// Convert a logger level to a printable string.
	///
	/// - parameter level: The priority level (Logger.Level).
	/// - returns: The printable string associated to the priority level.
	static _stringOf(level) {
		switch (level) {
		case Logger.Level.info:
			return "[Info]"
			break
			
		case Logger.Level.warning:
			return "[Warning]"
			break
			
		case Logger.Level.error:
			return "[Error]"
			break
			
		default:
			return ""
			break
		}
	}
	
	/// Log a simple message with a given level.
	///
	/// - parameter level: The message's priority level (Logger.Level)
	/// - parameter message: The message to log.
	static log(level, message) {
		const prefix = this._stringOf(level) || ""
		const separator = prefix.length > 0 ? " " : ""
		console.log(prefix + separator + message)
	}
	
	/// Log an informative message.
	///
	/// - parameter message: The message to log.
	static info(message) {
		this.log(Logger.Level.info, message)
	}
	
	/// Log a warning message.
	///
	/// - parameter message: The message to log.
	static warn(message) {
		this.log(Logger.Level.warning, message)
	}
	
	/// Log an error message.
	///
	/// - parameter message: The message to log.
	static error(message) {
		this.log(Logger.Level.error, message)
	}
}

/// The logger message priority level.
Logger.Level = {
	info: 0,
	warning: 1,
	error: 2
}

module.exports = Logger