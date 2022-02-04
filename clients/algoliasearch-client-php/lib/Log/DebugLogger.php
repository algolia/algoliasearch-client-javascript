<?php

namespace Algolia\AlgoliaSearch\Log;

use Psr\Log\AbstractLogger;

/**
 * This logger is only meant to be used in development, in order
 * to easily debug your Algolia calls. Don't use it on production!
 *
 * @internal
 */
final class DebugLogger extends AbstractLogger
{
    /**
     * Whether the logger is enabled or not.
     *
     * @var bool
     */
    private static $isEnabled = false;

    /**
     * Disables the logger.
     */
    public static function disable()
    {
        self::$isEnabled = false;
    }

    /**
     * Enables the logger.
     */
    public static function enable()
    {
        self::$isEnabled = true;
    }

    /**
     * @inheritdoc
     */
    public function log($level, $message, array $context = []): void
    {
        if (self::$isEnabled) {
            $logMessage = [
                'level' => $level,
                'message' => $message,
                'context' => $context,
            ];

            if (function_exists('dump')) {
                dump($logMessage);
            } else {
                var_dump($logMessage);
            }
        }
    }
}
