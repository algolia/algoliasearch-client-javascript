<?php

namespace Algolia\AlgoliaSearch\Http\Psr7;

use Psr\Http\Message\StreamInterface;

/**
 * @internal
 */
function stream_for($resource = '', array $options = [])
{
    if (is_scalar($resource)) {
        $stream = fopen('php://temp', 'r+');
        if ('' !== $resource) {
            fwrite($stream, $resource);
            fseek($stream, 0);
        }

        return new Stream($stream, $options);
    }
    switch (gettype($resource)) {
        case 'resource':
            return new Stream($resource, $options);
        case 'object':
            if ($resource instanceof StreamInterface) {
                return $resource;
            } elseif ($resource instanceof \Iterator) {
                return new PumpStream(function () use ($resource) {
                    if (!$resource->valid()) {
                        return false;
                    }
                    $result = $resource->current();
                    $resource->next();

                    return $result;
                }, $options);
            } elseif (method_exists($resource, '__toString')) {
                return stream_for((string) $resource, $options);
            }

            break;
        case 'NULL':
            return new Stream(fopen('php://temp', 'r+'), $options);
    }
    if (is_callable($resource)) {
        return new PumpStream($resource, $options);
    }

    throw new \InvalidArgumentException('Invalid resource type: '.gettype($resource));
}

/**
 * @internal
 */
function copy_to_string(StreamInterface $stream, $maxLen = -1)
{
    $buffer = '';
    if (-1 === $maxLen) {
        while (!$stream->eof()) {
            $buf = $stream->read(1048576);
            // Using a loose equality here to match on '' and false.
            if (null === $buf) {
                break;
            }
            $buffer .= $buf;
        }

        return $buffer;
    }
    $len = 0;
    while (!$stream->eof() && $len < $maxLen) {
        $buf = $stream->read($maxLen - $len);
        // Using a loose equality here to match on '' and false.
        if (null === $buf) {
            break;
        }
        $buffer .= $buf;
        $len = mb_strlen($buffer);
    }

    return $buffer;
}
