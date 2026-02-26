import type { Node } from 'reactflow';

/**
 * Data structure for the custom Text Node.
 * - label: Used for internal identification or display.
 * - text: The actual message content shown in the node.
 */
export interface TextNodeData {
  label: string;
  text: string;
}

/**
 * Data structure for the custom Image Node.
 * - label: Used for internal identification.
 * - imageUrl: The URL of the image to display.
 */
export interface ImageNodeData {
  label: string;
  imageUrl: string;
}

/**
 * Data structure for the custom Video Node.
 * - label: Used for internal identification.
 * - videoUrl: The URL of the video (e.g. YouTube embed or direct link).
 */
export interface VideoNodeData {
  label: string;
  videoUrl: string;
}

/**
 * Union type of all custom node types in the application.
 */
export type AppNode = 
  | Node<TextNodeData, 'textNode'>
  | Node<ImageNodeData, 'imageNode'>
  | Node<VideoNodeData, 'videoNode'>;
