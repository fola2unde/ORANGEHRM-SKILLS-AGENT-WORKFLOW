/**
 * Logger Utility for Test Execution
 * Provides consistent logging across tests
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

class Logger {
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  debug(message: string): void {
    console.log(this.formatMessage(LogLevel.DEBUG, message));
  }

  info(message: string): void {
    console.log(this.formatMessage(LogLevel.INFO, message));
  }

  warn(message: string): void {
    console.warn(this.formatMessage(LogLevel.WARN, message));
  }

  error(message: string, error?: Error): void {
    console.error(this.formatMessage(LogLevel.ERROR, message));
    if (error) {
      console.error(error.stack);
    }
  }

  logTestStart(testName: string): void {
    console.log(`\n${'='.repeat(60)}`);
    this.info(`TEST START: ${testName}`);
    console.log(`${'='.repeat(60)}\n`);
  }

  logTestEnd(testName: string, status: 'PASSED' | 'FAILED'): void {
    console.log(`\n${'='.repeat(60)}`);
    this.info(`TEST ${status}: ${testName}`);
    console.log(`${'='.repeat(60)}\n`);
  }

  logStep(stepName: string): void {
    this.info(`📍 STEP: ${stepName}`);
  }

  logAction(action: string): void {
    this.debug(`➜ ${action}`);
  }

  logAssertion(assertion: string): void {
    this.info(`✓ ASSERT: ${assertion}`);
  }
}

export const logger = new Logger();
