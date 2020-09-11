# UWP 窗体毛玻璃效果
```c#
using Windows.ApplicationModel.Core;
using Windows.UI.ViewManagement;
```
然后在构造函数MainPage()里添加以下代码：
```c#
var coreTitleBar = CoreApplication.GetCurrentView().TitleBar;
coreTitleBar.ExtendViewIntoTitleBar = true;
```
那么当这个页面构造的时候，就会把窗口内容扩展填充到标题栏啦。
这时候你试着运行这个应用，看到的应该是一片惨白的窗口，上面什么也没有，就连上面的标题栏都消失啦。当你试图拖曳窗口时发现是可以拖的！不过区域仅限于原来标题栏的位置。原因是我们没有调用Window.Current.SetTitleBar()这个方法来指定哪个部分是实际的标题栏，那就默认是原来的区域实现标题栏的功能啦。
#### 2. 使窗体半透明化
转到MainPage.xaml，在工程刚建的时候，这个xaml文件里面已经默认有一个Grid控件了，默认将它当作根的布局框架。我们为了使用笔刷，要给这个Grid起个名字，在Grid后面输入x:Name="GlassHost"，使这个标签如下面所示：
`<Grid x:Name="GlassHost">`
这就把它命名为GlassHost啦。按F7跳转到MainPage.xaml.cs，编写以下方法：

```c#
private void initializeFrostedGlass(UIElement glassHost)
{
        Visual hostVisual = ElementCompositionPreview.GetElementVisual(glassHost);
        Compositor compositor = hostVisual.Compositor;
        var backdropBrush = compositor.CreateHostBackdropBrush();
        var glassVisual = compositor.CreateSpriteVisual();
        glassVisual.Brush = backdropBrush;
        ElementCompositionPreview.SetElementChildVisual(glassHost, glassVisual);
        var bindSizeAnimation = compositor.CreateExpressionAnimation("hostVisual.Size");
        bindSizeAnimation.SetReferenceParameter("hostVisual", hostVisual);
        glassVisual.StartAnimation("Size", bindSizeAnimation);
}
```

这个方法的作用就是接收一个UI控件实例，然后把这个控件半透明和背景模。**但是，这个方法是将一个模糊层覆盖在被处理的控件之上的，所以这个控件上的任何信息、动作都会被覆盖掉**。因此窗体里面的控件元素，比如按钮，是不推荐用这个方法使其背景模糊的，不然的话这个按钮上的文字会被覆盖，点击动作也不能够响应。
创建了方法也要用才行啊，还记得我们刚刚命名为“GlassHost”的Grid吗？现在我们就可以用这个方法改变它！在构造函数MainPage()里添加以下代码：
`initializeFrostedGlass(GlassHost);`

好啦现在运行试试。

![右上角!](http://upload-images.jianshu.io/upload_images/4846400-fde9ead5526bdc13.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

咦，右上角的窗口按键怎么还是有颜色。嗯…它们的外观属性是和窗口本身分开的，需要另外设置，不过也不难。继续在构造函数MainPage()里添加以下代码：
```c#
var view = ApplicationView.GetForCurrentView(); 
view.TitleBar.ButtonBackgroundColor = Colors.Transparent; //将标题栏的三个键背景设为透明
view.TitleBar.ButtonInactiveBackgroundColor = Colors.Transparent; //失去焦点时，将三个键背景设为透明
view.TitleBar.ButtonInactiveForegroundColor = Colors.White; //失去焦点时，将三个键前景色设为白色
```

现在，效果如下图所示~
![只使用毛玻璃笔刷的效果](http://upload-images.jianshu.io/upload_images/4846400-aaece2e51dbfe129.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 3. 在模糊层之上布局

这样做出来的窗口虽然很美，可是没有内容展示也只能算是花瓶而已啦。我们也能发现只做以上处理的一个缺点就是，窗体是无色的半透明，而我们往往需要的是有色半透明，因为有时候背景太亮而窗口上的字是白色的话，内容就会变得难以识别。从我们最终的效果图看来，还有一种分区域的效果。下面我们就来看看怎么实现。
转到MainPage.xaml，我们先了解到一个技巧：在xaml中，控件代码在下面的控件反而是被显示在上层的。那么我们就要思考，我们能不能直接将新控件作为Grid“GlassHost”的子控件放在“GlassHost”里面呢？
**很遗憾，并不能，上面说过，使用了那个方法会是控件表面覆盖上透明层，但透明层是相对于窗体背后透明的，而非背后的控件。**
所以，我们只能在那个Grid之外而且是它之上（控件层次的上方，代码的上方）添加其他控件。我的做法是，保留那个Grid作为根Grid，但是**删掉**对它的命名。然后是xaml的page标签里面的内容呈现如下：
![呵呵](http://r.photo.store.qq.com/psc?/V11J2BXr3TLcNh/WUyRLVwskOVTItG8F0x768kqwQGsBKB6K*vun3EpaRrxraAToqleVUi8rha8n48QpW8DFgjG*mhu04tM*0rYOTbOc2wthnVNuula.NHIJR0!/r)