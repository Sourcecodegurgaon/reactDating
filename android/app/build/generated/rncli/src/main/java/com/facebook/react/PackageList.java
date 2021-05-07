
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @react-native-community/cookies
import com.reactnativecommunity.cookies.CookieManagerPackage;
// @react-native-community/datetimepicker
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
// @react-native-community/geolocation
import com.reactnativecommunity.geolocation.GeolocationPackage;
// @react-native-community/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @react-native-community/picker
import com.reactnativecommunity.picker.RNCPickerPackage;
// @react-native-cookies/cookies
import com.reactnativecommunity.cookies.CookieManagerPackage;
// @react-native-picker/picker
import com.reactnativecommunity.picker.RNCPickerPackage;
// react-native-cookies
import com.psykar.cookiemanager.CookieManagerPackage;
// react-native-date-picker
import com.henninghall.date_picker.DatePickerPackage;
// react-native-email-link
import com.facebook.react.modules.email.EmailPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-iap
import com.dooboolab.RNIap.RNIapPackage;
// react-native-image-base64
import fr.snapp.imagebase64.RNImgToBase64Package;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-paypal
import com.smarkets.paypal.RNPaypalPackage;
// react-native-paypal-gateway
import com.taessina.paypal.RNPaypalWrapperPackage;
// react-native-paypal-wrapper
import com.taessina.paypal.RNPaypalWrapperPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-version-check
import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;
// react-native-view-overflow
import com.entria.views.RNViewOverflowPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new CookieManagerPackage(),
      new RNDateTimePickerPackage(),
      new GeolocationPackage(),
      new RNCMaskedViewPackage(),
      new RNCPickerPackage(),
      new CookieManagerPackage(),
      new RNCPickerPackage(),
      new CookieManagerPackage(),
      new DatePickerPackage(),
      new EmailPackage(),
      new RNGestureHandlerPackage(),
      new RNIapPackage(),
      new RNImgToBase64Package(),
      new ImagePickerPackage(),
      new RNPaypalPackage(),
      new RNPaypalWrapperPackage(),
      new RNPaypalWrapperPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new VectorIconsPackage(),
      new RNVersionCheckPackage(),
      new RNViewOverflowPackage(),
      new RNCWebViewPackage(),
      new RNFetchBlobPackage()
    ));
  }
}
