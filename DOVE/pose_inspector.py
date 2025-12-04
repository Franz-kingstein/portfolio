"""
Example script to load and inspect pose data from .pose files
Requires pose-format library: pip install pose-format
"""

from pose_format import Pose
import numpy as np

def inspect_pose_file(pose_file_path):
    """
    Load and inspect a .pose file to understand its structure
    """
    try:
        # Load pose data
        data_buffer = open(pose_file_path, "rb").read()
        pose = Pose.read(data_buffer)

        # Get keypoints data
        keypoints = pose.body.data  # Shape: (frames, keypoints, 2)
        confidence = pose.body.confidence  # Shape: (frames, keypoints)

        print(f"Pose file: {pose_file_path}")
        print(f"Number of frames: {keypoints.shape[0]}")
        print(f"Number of keypoints: {keypoints.shape[1]}")
        print(f"Dimensions per keypoint: {keypoints.shape[2]}")  # Should be 2 (x,y)

        # Check keypoint types available
        print(f"Available keypoint types: {list(pose.header.components.keys())}")

        # Calculate pose vector dimensions
        total_dimensions = 0
        for component_name, component in pose.header.components.items():
            num_points = component.num_points
            dimensions = num_points * 2  # x,y coordinates
            total_dimensions += dimensions
            print(f"{component_name}: {num_points} points × 2 = {dimensions} dimensions")

        print(f"Total pose vector dimensions: {total_dimensions}")

        # Show sample frame
        if keypoints.shape[0] > 0:
            sample_frame = keypoints[0]  # First frame
            print(f"Sample frame shape: {sample_frame.shape}")
            print(f"Sample keypoints (first 5): {sample_frame[:5].flatten()}")

        return keypoints, confidence

    except Exception as e:
        print(f"Error loading pose file: {e}")
        return None, None

# Example usage (uncomment when you have pose files):
# pose_data, confidence = inspect_pose_file("path/to/your/file.pose")

print("Pose inspection function ready. Use inspect_pose_file() with a .pose file path.")
