import boto3

def generate_presigned_url(bucket_name, object_key, expiration=604800):
    """
    Generate a pre-signed URL to upload a file to S3. 7 days expiration
    
    :param bucket_name: S3 bucket name
    :param object_key: S3 key name (path/filename in bucket)
    :param expiration: Time in seconds for the pre-signed URL to remain valid
    :return: Pre-signed URL string
    """
    try:
        s3_client = boto3.client('s3')
        
        # Generate the presigned URL
        url = s3_client.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': bucket_name,
                'Key': object_key
            },
            ExpiresIn=expiration
        )
        
        print("Pre-signed URL generated successfully:")
        print(url)
        
    except Exception as e:
        print(f"Error generating pre-signed URL: {e}")

# Usage
bucket_name = "YOUR_BUCKET_NAME"
object_key = "uploads/your_file.txt"  # Example key
generate_presigned_url(bucket_name, object_key)
