package com.pictoanswer;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.CoreProtocolPNames;


import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.location.Address;
import android.location.Geocoder;
import android.net.ParseException;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.view.Menu;
import android.view.View;
import android.widget.Button;

public class MainScreen extends Activity {

	
	private Context con;
	private String imagePath;
	ProgressDialog _busyDialog = null;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main_screen);
		
		Button cameraButton = (Button) findViewById(R.id.camera);
		con = this;
		
		
		 cameraButton.setOnClickListener(new View.OnClickListener() {
	            public void onClick(View v) {
	            	
	            	File file = new File(Environment.getExternalStorageDirectory() + "/DCIM/Camera/"+"image" + new Date().getDay() + ".tiff");
	            	//System.out.println(Environment.getExternalStorageDirectory() + "/DCIM/"+"image" + new Date().getDay() + ".tif");
	                Uri imgUri = Uri.fromFile(file);
	                imagePath = file.getAbsolutePath();
	        		Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
	        		intent.putExtra(MediaStore.EXTRA_OUTPUT, imgUri);
	        		startActivityForResult(intent, 69);
	            }
		 });
		
	}
	
	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	    // Check which request we're responding to
		System.out.println(requestCode);
		System.out.println(resultCode);
	    	if (requestCode == 69) {
		        // Make sure the request was successful
		        if (resultCode == -1) {
		        	launchIntent();
		        }
		    }
	}
	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main_screen, menu);
		return true;
	}

	
	private void launchIntent()
	{
		Intent newIntent = new Intent(con, PhotoResults.class);
    	startActivityForResult(newIntent, 0);
	}
	
}
